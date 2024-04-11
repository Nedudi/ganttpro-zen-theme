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
    5250879378961:
      '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM4.5 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3.5 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM7.507 11h12.986c.556 0 1.007.42 1.007.94v.12c0 .52-.45.94-1.007.94H7.507c-.556 0-1.007-.42-1.007-.94v-.12c0-.52.45-.94 1.007-.94ZM20.493 16H7.507c-.556 0-1.007.42-1.007.94v.12c0 .52.45.94 1.007.94h12.986c.556 0 1.007-.42 1.007-.94v-.12c0-.52-.45-.94-1.007-.94ZM7.507 6h12.986c.556 0 1.007.42 1.007.94v.12c0 .52-.45.94-1.007.94H7.507C6.951 8 6.5 7.58 6.5 7.06v-.12c0-.52.45-.94 1.007-.94Z" fill="#A8A8A8"/></svg>',
    18249373274130:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 18H7C5.89543 18 5 17.1046 5 16V7C5 5.89543 5.89543 5 7 5H10.4376C10.9796 5 11.4985 5.22002 11.8753 5.60968L13.5714 7.36364H19C20.1046 7.36364 21 8.25907 21 9.36364V16C21 17.1046 20.1046 18 19 18ZM13.1474 8.36364H19C19.5523 8.36364 20 8.81135 20 9.36364V16C20 16.5523 19.5523 17 19 17H7C6.44772 17 6 16.5523 6 16V7C6 6.44771 6.44771 6 7 6H10.4376C10.7086 6 10.968 6.11001 11.1564 6.30484L13.1474 8.36364Z" fill="#A8A8A8"/><path d="M4 10.5C4 10.2239 3.77614 10 3.5 10C3.22386 10 3 10.2239 3 10.5V17.5C3 18.8807 4.11929 20 5.5 20H13.5C13.7761 20 14 19.7761 14 19.5C14 19.2239 13.7761 19 13.5 19H5.5C4.67157 19 4 18.3284 4 17.5V10.5Z" fill="#A8A8A8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19 18H7C5.89543 18 5 17.1046 5 16V7C5 5.89543 5.89543 5 7 5H10.4376C10.9796 5 11.4985 5.22002 11.8753 5.60968L13.5714 7.36364H19C20.1046 7.36364 21 8.25907 21 9.36364V16C21 17.1046 20.1046 18 19 18ZM13.1474 8.36364H19C19.5523 8.36364 20 8.81135 20 9.36364V16C20 16.5523 19.5523 17 19 17H7C6.44772 17 6 16.5523 6 16V7C6 6.44771 6.44771 6 7 6H10.4376C10.7086 6 10.968 6.11001 11.1564 6.30484L13.1474 8.36364Z" stroke="#A8A8A8" stroke-width="0.3" stroke-linecap="round"/><path d="M4 10.5C4 10.2239 3.77614 10 3.5 10C3.22386 10 3 10.2239 3 10.5V17.5C3 18.8807 4.11929 20 5.5 20H13.5C13.7761 20 14 19.7761 14 19.5C14 19.2239 13.7761 19 13.5 19H5.5C4.67157 19 4 18.3284 4 17.5V10.5Z" stroke="#A8A8A8" stroke-width="0.3" stroke-linecap="round"/></svg>',
    5250907485969:
      '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 9.5a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1ZM10 3.5a1 1 0 0 1 1 1v15a1 1 0 1 1-2 0v-15a1 1 0 0 1 1-1ZM6 13.5a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6ZM21 15.5a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0v-4Z" fill="#A8A8A8"/></svg>',
    5250956662033:
      '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1.75h10c.69 0 1.25.56 1.25 1.25v18c0 .69-.56 1.25-1.25 1.25H7c-.69 0-1.25-.56-1.25-1.25V3c0-.69.56-1.25 1.25-1.25Z" stroke="#A8A8A8" stroke-width="1.5" stroke-linecap="round"/><rect x="10" y="19" width="4" height="1" rx=".5" fill="#A8A8A8"/></svg>',
    360003692677:
      '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.87 2.5a.903.903 0 0 0-1.806 0h1.805Zm-1.806 19a.902.902 0 1 0 1.805 0h-1.805Zm3.467-8.544-.349.833.35-.833Zm-4.911-1.08 4.563 1.913.697-1.665-4.563-1.913-.697 1.665Zm3.318-7.903h-.971v1.804h.97V3.973Zm-.971 0h-.758v1.804h.758V3.973Zm.902.902V2.5h-1.805v2.375h1.805Zm.422 13.348h-1.324v1.805h1.324v-1.805Zm-1.324 0h-1.592v1.805h1.592v-1.805Zm-.903.902V21.5h1.805v-2.375h-1.805ZM7.098 16.75a3.278 3.278 0 0 0 3.277 3.277v-1.805c-.813 0-1.473-.659-1.473-1.472H7.098Zm8.5-.834a2.307 2.307 0 0 1-2.307 2.306v1.805c2.27 0 4.111-1.84 4.111-4.111h-1.805Zm-1.416-2.127a2.307 2.307 0 0 1 1.415 2.127h1.806a4.112 4.112 0 0 0-2.523-3.792l-.698 1.665ZM7.097 8.084c0 1.657.995 3.152 2.523 3.792l.698-1.665a2.307 2.307 0 0 1-1.415-2.127H7.096Zm1.805 0a2.307 2.307 0 0 1 2.307-2.306V3.973a4.112 4.112 0 0 0-4.111 4.111h1.804Zm8.5.354a4.465 4.465 0 0 0-4.465-4.466v1.805a2.66 2.66 0 0 1 2.66 2.66h1.806Z" fill="#A8A8A8"/></svg>',
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

    categories.sort((a, b) => a.position - b.position);
    sections.sort((a, b) => a.position - b.position);
    articles.sort((a, b) => a.position - b.position);

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
