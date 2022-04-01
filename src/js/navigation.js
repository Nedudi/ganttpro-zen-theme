document.addEventListener('DOMContentLoaded', function () {
  const navigation = document.getElementById('navigation');

  if (!navigation) return;

  const navList = navigation.querySelector('.navigation__list');
  const burger = navigation.querySelector('.navigation__burger');
  const locale = navigation.dataset.locale;
  const currentArticleID = navigation.dataset.articleId;

  const categoryIcons = {
    360003619497:
      '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.832 15.078a.75.75 0 0 0 1.061 1.061l-1.06-1.06ZM21.17 6.424l.738.132a.75.75 0 0 0-.868-.87l.13.738Zm-6.148.314a.75.75 0 1 0 .258 1.478l-.258-1.478Zm4.34 5.557a.75.75 0 0 0 1.477.263l-1.476-.263ZM11.97 15.61l.53.531-.53-.53Zm-10.076.53 4.596-4.596-1.06-1.06-4.597 4.595 1.061 1.061Zm4.243-4.596 4.596 4.596 1.06-1.06-4.596-4.597-1.06 1.06Zm6.363 4.597 9.2-9.185-1.06-1.062-9.2 9.186 1.06 1.061ZM21.04 5.685l-6.018 1.053.258 1.478L21.3 7.163l-.259-1.478Zm-.609.608-1.068 6.002 1.476.263 1.069-6.002-1.477-.263Zm-9.699 9.846a1.25 1.25 0 0 0 1.767.001l-1.06-1.062a.25.25 0 0 1 .354 0l-1.06 1.061ZM6.49 11.543a.25.25 0 0 1-.353 0l1.06-1.06a1.25 1.25 0 0 0-1.767 0l1.06 1.06Z" fill="#A8A8A8"/></svg>',
    360003692657:
      '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.96 3.5a2.829 2.829 0 0 0-2.825 2.833v3.349h-2.31A2.829 2.829 0 0 0 2 12.515v5.152A2.829 2.829 0 0 0 4.824 20.5h13.352A2.829 2.829 0 0 0 21 17.667V6.333A2.829 2.829 0 0 0 18.176 3.5H9.959Zm1.489 15.454h6.727c.709 0 1.284-.576 1.284-1.287V6.333c0-.71-.575-1.288-1.284-1.288H9.959c-.709 0-1.283.577-1.283 1.288v3.349h.256a2.829 2.829 0 0 1 2.825 2.833v5.152c0 .463-.111.901-.308 1.287Zm-6.625-7.727c-.709 0-1.283.577-1.283 1.288v5.152c0 .71.574 1.287 1.283 1.287h4.108c.71 0 1.284-.576 1.284-1.287v-5.152c0-.711-.575-1.288-1.284-1.288H4.824Z" fill="#A8A8A8"/></svg>',
    360003735297:
      '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 13.029a3.086 3.086 0 1 0 0-6.172 3.086 3.086 0 0 0 0 6.172Zm0-1.543A1.543 1.543 0 1 0 12 8.4a1.543 1.543 0 0 0 0 3.086Z" fill="#A8A8A8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-7.457 9a7.457 7.457 0 1 1 12.48 5.512l-.241-1.02a2.829 2.829 0 0 0-2.753-2.178H9.971a2.829 2.829 0 0 0-2.753 2.179l-.24 1.019A7.438 7.438 0 0 1 4.542 12Zm3.788 6.494a7.422 7.422 0 0 0 3.669.963c1.334 0 2.586-.35 3.67-.963l-.39-1.647a1.286 1.286 0 0 0-1.25-.99H9.97c-.595 0-1.113.41-1.25.99l-.39 1.646Z" fill="#A8A8A8"/></svg>',
    4406279640337:
      '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6.444A2.444 2.444 0 0 1 6.444 4h8.857a2.889 2.889 0 0 1 2.044.846l1.809 1.81A2.89 2.89 0 0 1 20 8.698v8.857A2.444 2.444 0 0 1 17.556 20H6.444A2.444 2.444 0 0 1 4 17.556V6.444Zm2.444-1.11c-.613 0-1.11.497-1.11 1.11v11.112c0 .613.497 1.11 1.11 1.11h.223V14a2 2 0 0 1 2-2h6.666a2 2 0 0 1 2 2v4.667h.223c.613 0 1.11-.498 1.11-1.111V8.699c0-.414-.163-.81-.455-1.1l-1.81-1.81a1.556 1.556 0 0 0-.845-.435v2.424a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5.333H6.444ZM16 18.666V14a.666.666 0 0 0-.667-.667H8.667A.667.667 0 0 0 8 14v4.667h8ZM8.889 5.333v2.445c0 .368.299.666.667.666h4a.667.667 0 0 0 .666-.666V5.333H8.89Z" fill="#A8A8A8"/></svg>',
    360003692717:
      '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 7h4v1.5H7a3.5 3.5 0 1 0 0 7h4V17H7A5 5 0 0 1 7 7ZM17 15.5h-4V17h4a5 5 0 0 0 0-10h-4v1.5h4a3.5 3.5 0 1 1 0 7Z" fill="#A8A8A8"/><path d="M16 12.75v-1.5H8v1.5h8Z" fill="#A8A8A8"/></svg>',
    360003625478:
      '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.875 8.667h-1.813v-1.62A4.057 4.057 0 0 0 12 3a4.057 4.057 0 0 0-4.063 4.048v1.619H6.125c-.894 0-1.625.728-1.625 1.619v8.095c0 .89.731 1.619 1.625 1.619h11.75c.894 0 1.625-.729 1.625-1.619v-8.095c0-.89-.731-1.62-1.625-1.62Zm-8.394-1.62c0-1.384 1.13-2.509 2.519-2.509a2.516 2.516 0 0 1 2.519 2.51v1.619H9.48v-1.62Zm8.394 11.334H6.125v-8.095h11.75v8.095Z" fill="#A8A8A8"/></svg>',
    360003692677: '',
  };

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
    btn.innerHTML = `
      <svg width="6" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.032 3.614a.5.5 0 0 1 0 .772l-3.964 3.27A.5.5 0 0 1 .25 7.27V.73a.5.5 0 0 1 .818-.385l3.964 3.27Z" />
      </svg>
      <span>${name}</span>
    `;

    btn.addEventListener('click', onClickElementButton);

    li.append(btn);

    return li;
  }

  function createCategoryElement({ id, name }) {
    let li = document.createElement('li');
    let btn = document.createElement('button');

    li.className = 'navigation__item';

    if (categoryIcons[id]) {
      btn.innerHTML = `${categoryIcons[id]}<span id="${id}">${name}</span>`;
    } else {
      btn.innerHTML = `<span id="${id}">${name}</span>`;
    }

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
