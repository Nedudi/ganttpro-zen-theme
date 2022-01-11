document.addEventListener('DOMContentLoaded', function () {
  const navigation = document.getElementById('navigation');

  if (!navigation) return;

  const navList = navigation.querySelector('.navigation__list');
  const burger = navigation.querySelector('.navigation__burger');
  const locale = navigation.dataset.locale;
  const currentArticleID = navigation.dataset.articleId;

  function getData(url) {
    return fetch(url).then((res) => res.json());
  }

  function getPost(type) {
    return new Promise(function (resolve, reject) {
      const url = `/api/v2/help_center/${locale}/${type}`;
      let result = [];

      getData(url).then((data) => {
        result = [...result, ...data[type]];

        if (data.next_page) {
          const pageCount = data.page_count;
          let successfulRequests = 1;

          for (let pageNumber = 2; pageNumber <= pageCount; pageNumber++) {
            getData(`${url}?page=${pageNumber}`).then((otherData) => {
              result = [...result, ...otherData[type]];
              successfulRequests += 1;

              if (successfulRequests === pageCount) {
                resolve(result);
              }
            });
          }
        } else {
          resolve(result);
        }
      });
    });
  }

  function getNavigation() {
    return new Promise(function (resolve, reject) {
      const result = {};

      function checkData() {
        if (result.categories && result.sections && result.articles) {
          resolve(result);
        }
      }

      getPost('categories').then((categories) => {
        result.categories = categories;
        checkData();
      });

      getPost('sections').then((sections) => {
        result.sections = sections;
        checkData();
      });

      getPost('articles').then((articles) => {
        result.articles = articles;
        checkData();
      });
    });
  }

  function onClickElementButton(evt) {
    evt.preventDefault();

    evt.currentTarget.parentElement.classList.toggle('active');
  }

  burger.addEventListener('click', (evt) => {
    evt.preventDefault();

    navList.classList.toggle('navigation__list--show');
    evt.currentTarget.classList.toggle('navigation__burger--show');
  });

  function createArticleElement({ id, name, html_url }, active) {
    let li = document.createElement('li');
    let classNames = 'navigation__article-item';

    if (active) {
      classNames = classNames + ' current';
      li.innerHTML = `<a>${name}</a>`;
    } else {
      li.innerHTML = `<a href="${html_url}">${name}</a>`;
    }

    li.className = classNames;

    return li;
  }

  function createSectionElement({ name }) {
    let li = document.createElement('li');
    let btn = document.createElement('button');

    li.className = 'navigation__section-item';
    btn.innerText = name;

    btn.addEventListener('click', onClickElementButton);

    li.append(btn);

    return li;
  }

  function createCategoryElement({ name }) {
    let li = document.createElement('li');
    let btn = document.createElement('button');

    li.className = 'navigation__item';
    btn.innerText = name;

    btn.addEventListener('click', onClickElementButton);

    li.append(btn);

    return li;
  }

  function drawNavigation({ categories, sections, articles }) {
    let fragment = new DocumentFragment();

    // Caregories
    categories.forEach((category) => {
      let categoryElement = createCategoryElement(category);
      let sectionList = document.createElement('ul');
      sectionList.className = 'navigation__section-list';
      // Sections
      sections.forEach((section) => {
        if (section.category_id === category.id) {
          let sectionElement = createSectionElement(section);
          let articleList = document.createElement('ul');
          articleList.className = 'navigation__article-list';
          // Articles
          articles.forEach((article) => {
            if (article.section_id === section.id) {
              let active = Number(article.id) === Number(currentArticleID) || false;
              let articleElement = createArticleElement(article, active);
              articleList.append(articleElement);

              if (active) {
                sectionElement.className = sectionElement.className + ' current active';
                categoryElement.className = categoryElement.className + ' current active';
              }
            }
          });

          sectionElement.append(articleList);
          sectionList.append(sectionElement);
        }
      });

      categoryElement.append(sectionList);
      fragment.append(categoryElement);
    });

    navList.append(fragment);
  }

  getNavigation().then((data) => {
    drawNavigation(data);
  });
});
