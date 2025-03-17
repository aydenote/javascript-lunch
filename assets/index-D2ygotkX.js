var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _information, _restaurants;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function FormItemField({ item, component }) {
  const formItemElement = document.createElement("div");
  const labelElement = document.createElement("label");
  formItemElement.classList.add("form-item");
  if (item.required) {
    formItemElement.classList.add("form-item--required");
  }
  labelElement.setAttribute("for", item.name);
  labelElement.textContent = item.label;
  formItemElement.appendChild(labelElement);
  formItemElement.appendChild(component);
  if (item.notice) formItemElement.innerHTML += `<span class="help-text text-caption">${item.notice}</span>`;
  return formItemElement;
}
function InputField({ type, name, required = false }) {
  const inputElement = document.createElement("input");
  inputElement.type = type;
  inputElement.name = name;
  inputElement.id = name;
  inputElement.required = required;
  return inputElement;
}
function SelectField({ values, name, selectedOption }) {
  const selectElement = document.createElement("select");
  selectElement.id = name;
  selectElement.name = name;
  selectElement.required = true;
  if (selectedOption) {
    selectElement.addEventListener("change", (event) => selectedOption(event));
  }
  selectElement.innerHTML = `
    ${values.map((category) => `<option value="${category}">${category}</option>`).join("")}
    `;
  return selectElement;
}
const TEXTAREA = {
  COLS: 30,
  ROWS: 10
};
function TextareaField({ name, required = false }) {
  const textareaElement = document.createElement("textarea");
  textareaElement.name = name;
  textareaElement.id = name;
  textareaElement.cols = TEXTAREA.COLS;
  textareaElement.rows = TEXTAREA.ROWS;
  textareaElement.required = required;
  return textareaElement;
}
function generateUniqueId() {
  return crypto.randomUUID();
}
function getRestaurantStorage() {
  if (!localStorage.getItem("restaurant")) {
    localStorage.setItem("restaurant", JSON.stringify(LIST_ITEM_CONTENTS));
  }
  return JSON.parse(localStorage.getItem("restaurant"));
}
function setRestaurantStorage(restaurantInformation) {
  localStorage.setItem("restaurant", JSON.stringify(restaurantInformation));
}
const HEADER_CONTENTS = {
  TITLE: "점심 뭐 먹지",
  LABEL: "음식점 추가"
};
const LIST_ITEM_CONTENTS = [
  {
    id: generateUniqueId(),
    category: "한식",
    name: "피양콩할마니",
    distance: "10분 내",
    description: "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.",
    favorites: false
  },
  {
    id: generateUniqueId(),
    category: "중식",
    name: "친친",
    distance: "5분 내",
    description: "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다.",
    favorites: false
  },
  {
    id: generateUniqueId(),
    category: "일식",
    name: "잇쇼우",
    distance: "1분 내",
    description: "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다.",
    favorites: false
  },
  {
    id: generateUniqueId(),
    category: "양식",
    name: "이태리키친",
    distance: "20분 내",
    description: "늘 변화를 추구하는 이태리키친입니다.",
    favorites: false
  },
  {
    id: generateUniqueId(),
    category: "아시안",
    name: "호아빈 삼성점",
    distance: "15분 내",
    description: "푸짐한 양에 국물이 일품인 쌀국수.",
    favorites: false
  },
  {
    id: generateUniqueId(),
    category: "기타",
    name: "도스타코스 선릉점",
    distance: "5분 내",
    description: "멕시칸 캐주얼 그릴.",
    favorites: false
  }
];
const SELECT_CATEGORY = ["none", "ko", "ch", "ja", "we", "as", "etc"];
const SELECT_FILTER = ["all", "ko", "ch", "ja", "we", "as", "etc"];
const SELECT_DISTANCE = ["none", 5, 10, 15, 20, 30];
const SELECT_SORT = ["name", "distance"];
const MODAL_BUTTONS_PROPERTY = [
  { type: "button", stylingBased: "secondary", text: "취소하기" },
  { type: "submit", stylingBased: "primary", text: "등록하기" }
];
const RESTAURANT_MODAL_PROPERTY = [
  { type: "submit", stylingBased: "secondary", text: "삭제하기" },
  { type: "button", stylingBased: "primary", text: "닫기" }
];
function formatDistance(distanceMap) {
  const categoryNames = {
    none: "선택해주세요.",
    5: "5분 내",
    10: "10분 내",
    15: "15분 내",
    20: "20분 내",
    30: "30분 내"
  };
  return distanceMap.map((distance) => categoryNames[distance]);
}
function formatCategory(categoryMap) {
  const categoryNames = {
    none: "선택해주세요.",
    ko: "한식",
    ch: "중식",
    ja: "일식",
    we: "양식",
    as: "아시안",
    etc: "기타"
  };
  return categoryMap.map((category) => categoryNames[category]);
}
function formatFilter(categoryMap) {
  const categoryNames = {
    all: "전체",
    ko: "한식",
    ch: "중식",
    ja: "일식",
    we: "양식",
    as: "아시안",
    etc: "기타"
  };
  return categoryMap.map((category) => categoryNames[category]);
}
function formatSort(sortMap) {
  const sortNames = {
    name: "이름순",
    distance: "거리순"
  };
  return sortMap.map((sort) => sortNames[sort]);
}
function convertObjectToArray(object) {
  return Object.values(object);
}
function Header({ TITLE, LABEL }) {
  const headerElement = document.createElement("header");
  headerElement.classList.add("gnb");
  headerElement.innerHTML = `
    <h1 class="gnb__title text-title">${TITLE}</h1>
    <button type="button" class="gnb__button" aria-label=${LABEL}>
      <img src="./public/add-button.png" alt=${LABEL} />
    </button>
    `;
  return headerElement;
}
function Button({ type, stylingBased, text }) {
  const buttonElement = document.createElement("button");
  buttonElement.type = type;
  buttonElement.innerText = text;
  buttonElement.className = `button button--${stylingBased} text-caption`;
  return buttonElement;
}
function ButtonsField(buttonsProperty) {
  const buttonContainerElement = document.createElement("div");
  buttonContainerElement.classList.add("button-container");
  buttonsProperty.forEach((buttonProperty) => {
    buttonContainerElement.appendChild(Button(buttonProperty));
  });
  return buttonContainerElement;
}
function Form({ formItems = [], buttons = [] }) {
  const formElement = document.createElement("form");
  if (formItems.length > 0) {
    formItems.forEach((formItem) => {
      formElement.appendChild(formItem);
    });
  }
  if (buttons.length > 0) {
    formElement.appendChild(ButtonsField(buttons));
  }
  return formElement;
}
const EventHandler = {
  modalToggle: (element, formElement = null) => {
    if (formElement) formElement.reset();
    element.querySelector(".modal").classList.toggle("modal--open");
  },
  formDataParsing: (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    return values;
  },
  tabToggle: (event, elementClassName, toggleName) => {
    const toggleElements = document.querySelectorAll(`.${elementClassName}`);
    const clickedButton = event.target.closest("button");
    for (const element of toggleElements) {
      element.classList.remove("enabled");
    }
    clickedButton.classList.add("enabled");
  }
};
class Restaurant {
  constructor({ id, category, name, distance, description = "", link = "", favorites = false }) {
    __privateAdd(this, _information);
    __privateSet(this, _information, {
      id,
      category,
      name,
      distance,
      description,
      link,
      favorites
    });
  }
  get information() {
    return { ...__privateGet(this, _information) };
  }
  updateInformation() {
    __privateGet(this, _information).favorites = !__privateGet(this, _information).favorites;
  }
}
_information = new WeakMap();
class RestaurantList {
  constructor(listItemContents = []) {
    __privateAdd(this, _restaurants);
    __privateSet(this, _restaurants, this.initialAddRestaurant(listItemContents));
  }
  initialAddRestaurant(listItemContents) {
    return listItemContents.map((listItemContent) => new Restaurant(listItemContent));
  }
  addRestaurant(restaurantInformation) {
    const newRestaurant = new Restaurant({
      ...restaurantInformation,
      id: generateUniqueId()
    });
    __privateGet(this, _restaurants).push(newRestaurant);
    const newRestaurantData = __privateGet(this, _restaurants).map((restaurant) => restaurant.information);
    setRestaurantStorage(newRestaurantData);
    return newRestaurant;
  }
  deleteRestaurant(id) {
    const targetIndex = __privateGet(this, _restaurants).findIndex((restaurant) => restaurant.information.id === id);
    if (targetIndex !== -1) {
      __privateGet(this, _restaurants).splice(targetIndex, 1);
      const newRestaurantData = __privateGet(this, _restaurants).map((restaurant) => restaurant.information);
      setRestaurantStorage(newRestaurantData);
    }
  }
  updateRestaurant(id) {
    const targetRestaurant = __privateGet(this, _restaurants).find((restaurant) => restaurant.information.id === id);
    if (targetRestaurant) {
      targetRestaurant.updateInformation();
      const newRestaurantData = __privateGet(this, _restaurants).map((restaurant) => restaurant.information);
      setRestaurantStorage(newRestaurantData);
    }
  }
  getRestaurantInformation(id) {
    const found = __privateGet(this, _restaurants).find((restaurant) => restaurant.information.id === id);
    return found ? found.information : void 0;
  }
  get restaurants() {
    return [...__privateGet(this, _restaurants)];
  }
}
_restaurants = new WeakMap();
function SelectSortController(app2, listContainerElement) {
  let currentFilter = "전체";
  let currentSort = "";
  function updateList() {
    const storedRestaurants = getRestaurantStorage();
    const restaurantList = new RestaurantList(storedRestaurants);
    let filteredRestaurants = restaurantList.restaurants.filter((restaurant) => {
      if (currentFilter === "전체") {
        return true;
      }
      return restaurant.information.category === currentFilter;
    });
    if (currentSort === "이름순") {
      filteredRestaurants = filteredRestaurants.sort((a, b) => a.information.name.localeCompare(b.information.name));
    } else if (currentSort === "거리순") {
      filteredRestaurants = filteredRestaurants.sort(
        (a, b) => parseInt(a.information.distance) - parseInt(b.information.distance)
      );
    }
    listContainerElement.innerHTML = "";
    const listElement = List(filteredRestaurants, restaurantList);
    listContainerElement.appendChild(listElement);
    app2.appendChild(listContainerElement);
  }
  const divElement = document.createElement("div");
  divElement.classList.add("select-sort-container");
  const filterComponent = SelectField({
    name: "filter",
    values: formatFilter(SELECT_FILTER),
    selectedOption: (event) => {
      currentFilter = event.target.value;
      updateList();
    }
  });
  const sortComponent = SelectField({
    name: "sort",
    values: formatSort(SELECT_SORT),
    selectedOption: (event) => {
      currentSort = event.target.value;
      updateList();
    }
  });
  divElement.appendChild(filterComponent);
  divElement.appendChild(sortComponent);
  app2.appendChild(divElement);
}
function ListController(app2, listContainerElement, type = "all") {
  const storedRestaurants = getRestaurantStorage();
  const restaurantList = new RestaurantList(storedRestaurants);
  let listElement;
  listContainerElement.innerHTML = "";
  if (type === "favorite") {
    listElement = List(
      restaurantList.restaurants.filter((restaurant) => restaurant.information.favorites),
      restaurantList
    );
  }
  if (type === "all") {
    listElement = List(restaurantList.restaurants, restaurantList);
  }
  listContainerElement.appendChild(listElement);
  app2.appendChild(listContainerElement);
  return { listElement, restaurantList };
}
const CATRGORY_IMAGE_PATH = {
  한식: "https://aydenote.github.io/javascript-lunch/public/category-korean.png",
  중식: "https://aydenote.github.io/javascript-lunch/public/category-chinese.png",
  일식: "https://aydenote.github.io/javascript-lunch/public/category-japanese.png",
  양식: "https://aydenote.github.io/javascript-lunch/public/category-western.png",
  아시안: "https://aydenote.github.io/javascript-lunch/public/category-asian.png",
  기타: "https://aydenote.github.io/javascript-lunch/public/category-etc.png"
};
function renderFavoritesImg(favorites) {
  if (favorites) {
    return "https://aydenote.github.io/javascript-lunch/public/favorite-icon-filled.png";
  }
  return "https://aydenote.github.io/javascript-lunch/public/favorite-icon-lined.png";
}
function ListItem({ id, category, name, distance, description, favorites, link }, { onClick = null, className = "" }) {
  const listElement = document.createElement("li");
  listElement.classList.add(`restaurant`);
  listElement.dataset.id = id;
  if (onClick) {
    listElement.addEventListener("click", (event) => onClick(event));
  }
  if (className === "information") {
    listElement.classList.add(className);
  }
  function createLink() {
    if (className === "information") {
      return `<a href="${link} class="link__text">${link}</a>`;
    }
    return "";
  }
  listElement.innerHTML = `
    <div class="restaurant__category">
      <img src=${CATRGORY_IMAGE_PATH[category]} alt=${category} class="category-icon" />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${distance}</span>
      <p class="restaurant__description text-body">
      ${description}
      </p>
      </div>
      <img src="${renderFavoritesImg(favorites)}" alt=favorites class="favorites-icon" />
      ${createLink()}
    `;
  return listElement;
}
function toggleFavorite(event, restaurantList, restaurantId) {
  restaurantList.updateRestaurant(restaurantId);
  const favoriteIcon = event.target.closest("img.favorites-icon");
  const restaurantFavoriteIconElement = document.querySelector(
    `.restaurant-list-container [data-id="${restaurantId}"] img.favorites-icon`
  );
  if (!favoriteIcon) return;
  if (favoriteIcon.src.includes("favorite-icon-lined.png")) {
    favoriteIcon.src = "./public/favorite-icon-filled.png";
    restaurantFavoriteIconElement.src = "./public/favorite-icon-filled.png";
  } else {
    favoriteIcon.src = "./public/favorite-icon-lined.png";
    restaurantFavoriteIconElement.src = "./public/favorite-icon-lined.png";
  }
}
function openModal(restaurantList, restaurantId) {
  const filteredRestaurant = restaurantList.getRestaurantInformation(restaurantId);
  const formItems = [
    ListItem(filteredRestaurant, {
      onClick: (event) => toggleFavorite(event, restaurantList, restaurantId),
      className: "information"
    })
  ];
  const mainElement = app.querySelector("main");
  const formElement = Form({ formItems, buttons: RESTAURANT_MODAL_PROPERTY });
  const modalElement = document.querySelector(".modal");
  if (modalElement) modalElement.remove();
  ModalController({
    children: { formElement },
    submit: (event) => {
      const restaurantElement = document.querySelector(".restaurant");
      const storedRestaurants = getRestaurantStorage();
      const restaurantList2 = new RestaurantList(storedRestaurants);
      restaurantList2.deleteRestaurant(restaurantElement.dataset.id);
    },
    cancle: () => {
      EventHandler.modalToggle(mainElement, formElement);
    }
  });
  EventHandler.modalToggle(app);
}
const restaurantItemClick = (event, restaurantList) => {
  const restaurantId = event.currentTarget.dataset.id;
  if (event.target.className === "favorites-icon") {
    toggleFavorite(event, restaurantList, restaurantId);
  } else {
    openModal(restaurantList, restaurantId);
  }
};
function List(listItems, restaurantList) {
  const listElement = document.createElement("ul");
  listElement.classList.add("restaurant-list");
  listItems.forEach((item) => {
    const listItemElement = ListItem(item.information, {
      onClick: (event) => restaurantItemClick(event, restaurantList)
    });
    listElement.appendChild(listItemElement);
  });
  return listElement;
}
function Modal(innerComponents) {
  const modalElement = document.createElement("div");
  const modalBackdropElement = document.createElement("div");
  const modalContainerElement = document.createElement("div");
  modalElement.classList.add("modal");
  modalBackdropElement.classList.add("modal-backdrop");
  modalContainerElement.classList.add("modal-container");
  innerComponents.forEach((component) => {
    modalContainerElement.appendChild(component);
  });
  modalElement.appendChild(modalBackdropElement);
  modalElement.appendChild(modalContainerElement);
  return modalElement;
}
function Title({ type = "default", text }) {
  const h2Element = document.createElement("h2");
  h2Element.classList.add("text-title");
  if (type === "modal") h2Element.classList.add("modal-title");
  h2Element.innerText = text;
  return h2Element;
}
function getModalContent() {
  const titleElement = Title({ type: "modal", text: "새로운 음식점" });
  const formItems = createFormItems(INPUT_ITEMS);
  const formElement = Form({ formItems, buttons: MODAL_BUTTONS_PROPERTY });
  return { titleElement, formElement };
}
function getModalHandlers({ restaurantList, listElement, mainElement, formElement }) {
  const handleSubmit = (event) => {
    const values = EventHandler.formDataParsing(event);
    const restaurant = restaurantList.addRestaurant(values);
    listElement.appendChild(
      ListItem(restaurant.information, {
        onClick: (event2) => restaurantItemClick(event2, restaurantList)
      })
    );
    EventHandler.modalToggle(mainElement, formElement);
  };
  const handleCancel = () => {
    EventHandler.modalToggle(mainElement, formElement);
  };
  return { handleSubmit, handleCancel };
}
function openRestaurantModal(app2, listContainerElement) {
  const mainElement = app2.querySelector("main");
  const { titleElement, formElement } = getModalContent();
  const existingModal = document.querySelector(".modal");
  if (existingModal) {
    existingModal.remove();
  }
  const { listElement, restaurantList } = ListController(app2, listContainerElement);
  const { handleSubmit, handleCancel } = getModalHandlers({ restaurantList, listElement, mainElement, formElement });
  ModalController({
    children: { titleElement, formElement },
    submit: handleSubmit,
    cancle: handleCancel
  });
  EventHandler.modalToggle(app2);
}
function ModalController({ children, submit = null, cancle = null }) {
  const mainElement = app.querySelector("main");
  const modalElement = Modal(convertObjectToArray(children));
  const closeButtonElement = children.formElement.querySelector("button[type='button']");
  const modalBackdropElement = modalElement.querySelector(".modal-backdrop");
  document.querySelector(".favorites-icon");
  modalBackdropElement.addEventListener("click", () => EventHandler.modalToggle(mainElement, children.formElement));
  closeButtonElement.addEventListener("click", () => cancle());
  children.formElement.addEventListener("submit", (event) => submit(event));
  mainElement.appendChild(modalElement);
}
function HeaderController(app2, listContainerElement) {
  app2.appendChild(Header(HEADER_CONTENTS));
  const modalButtonElement = app2.querySelector("header button.gnb__button");
  modalButtonElement.addEventListener("click", () => {
    openRestaurantModal(app2, listContainerElement);
  });
}
function Tab({ title, isEnable = false, type }) {
  const buttonTabElement = document.createElement("button");
  buttonTabElement.className = "tab";
  buttonTabElement.dataset.type = type;
  if (isEnable) {
    buttonTabElement.classList.add("enabled");
  }
  buttonTabElement.innerHTML = `
    <p data>${title}</p>
  `;
  return buttonTabElement;
}
const TAB_ITEMS = [
  {
    title: "모든 음식점",
    isEnable: true,
    type: "all"
  },
  {
    title: "자주 가는 음식점",
    isEnable: false,
    type: "favorite"
  }
];
function TabController(app2) {
  const tabContainerElement = document.createElement("div");
  tabContainerElement.classList.add("tab-container");
  TAB_ITEMS.forEach((item) => {
    tabContainerElement.appendChild(Tab({ title: item.title, isEnable: item.isEnable, type: item.type }));
  });
  tabContainerElement.addEventListener("click", (event) => {
    const app3 = document.getElementById("app");
    const selectContainerElement = document.querySelector(".select-sort-container");
    if (selectContainerElement) {
      selectContainerElement.remove();
    }
    const listContainerElement = document.querySelector(".restaurant-list-container");
    EventHandler.tabToggle(event, "tab", "enable");
    const enabledTab = document.querySelector(".tab.enabled");
    if (enabledTab.dataset.type === "favorite") ;
    else {
      SelectSortController(app3, listContainerElement);
    }
    ListController(app3, listContainerElement, enabledTab.dataset.type);
  });
  app2.appendChild(tabContainerElement);
  const listType = document.querySelector(".tab.enabled").dataset.type;
  return { type: listType };
}
const INPUT_ITEMS = [
  {
    label: "카테고리",
    tag: "select",
    type: "select",
    name: "category",
    required: true,
    notice: "",
    values: formatCategory(SELECT_CATEGORY)
  },
  {
    label: "이름",
    tag: "input",
    type: "text",
    name: "name",
    notice: "",
    required: true,
    values: ""
  },
  {
    label: "거리(도보 이동 시간)",
    tag: "select",
    type: "select",
    name: "distance",
    required: true,
    values: formatDistance(SELECT_DISTANCE)
  },
  {
    label: "설명",
    tag: "textarea",
    type: "textarea",
    name: "description",
    required: false,
    notice: "메뉴 등 추가 정보를 입력해 주세요.",
    values: ""
  },
  {
    label: "참고 링크",
    tag: "input",
    type: "url",
    name: "link",
    required: false,
    notice: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
    values: ""
  }
];
function createFormItems(inputItems) {
  const formItems = inputItems.map((item) => {
    if (item.tag === "select") {
      const component = SelectField(item);
      return FormItemField({ item, component });
    }
    if (item.tag === "input") {
      const component = InputField(item);
      return FormItemField({ item, component });
    }
    if (item.tag === "textarea") {
      const component = TextareaField(item);
      return FormItemField({ item, component });
    }
  });
  return formItems;
}
function MainController() {
  const app2 = document.getElementById("app");
  const listContainerElement = document.createElement("section");
  listContainerElement.classList.add("restaurant-list-container");
  HeaderController(app2, listContainerElement);
  TabController(app2);
  SelectSortController(app2, listContainerElement);
  ListController(app2, listContainerElement);
}
MainController();
