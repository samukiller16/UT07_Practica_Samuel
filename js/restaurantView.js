import { newDishValidation,  } from './validation.js';

const EXCECUTE_HANDLER = Symbol('excecuteHandler');

class RestaurantView {
  constructor() {
    this.main = document.getElementsByTagName("main")[0];
    this.categories = document.getElementById("categories");
    this.menu = document.getElementById("navPrinc");
    this.dishes = document.getElementById("dishes");
    this.productWindows = [];
  }

  [EXCECUTE_HANDLER](handler, handlerArguments, scrollElement, data, url, event) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }
    

  bindInit(handler) {
    document.getElementById('init').addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#', event);
    });
  }

  showCategories(categories) {
    if (this.categories.children.length >= 1)
      this.categories.children[0].remove();
    const container = document.createElement("div");
    container.id = "category-list";
    container.classList.add("row");
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="col-lg-3 col-md-6"><a data-category="${category.name}" href="#product-list">
        <div class="cat-list-image"><img alt="${category.name}" src="${category.url}" />
        </div>
        <div class="cat-list-text">
          <h3>${category.name}</h3>
          <div>${category.description}</div>
        </div>
      </a>
    </div>`
      );
    }
    container.insertAdjacentHTML('afterbegin', `<h1>Categorías</h1><br>`);
    this.categories.append(container);
  }

  showCategoriesInMenu(categories) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button"
			data-bs-toggle="dropdown" aria-expanded="false">Categorías</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");

    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.name}" class="dropdown-item" href="#product-list">${category.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showDishes(dishes) {
    if (this.dishes.children.length >= 1)
      this.dishes.children[0].remove();
    //Cogemos los datos del iterador
    const allDishes = [...dishes];
    const randomDishes = [];
    while (randomDishes.length < 3 && allDishes.length > 0) {
      const randomIndex = Math.floor(Math.random() * (allDishes.length - 1));
      randomDishes.push(allDishes[randomIndex]);
      // Eliminar el plato seleccionado para evitar duplicados
      allDishes.splice(randomIndex, 1);
    }

    this.dishes.replaceChildren();
    if (this.dishes.children.length > 1) this.dishes.children[1].remove();
    const container = document.createElement('div');
    container.id = 'rand-list';
    container.classList.add('container');
    container.classList.add('my-3');
    container.insertAdjacentHTML('beforeend', '<div class="row"> </div>');

    for (const product of randomDishes) {
      const div = document.createElement('div');
      div.classList.add('col-md-4');
      div.insertAdjacentHTML('beforeend', `<figure class="card card-product-grid card-lg"> <a data-serial="${product.dish.name}" href="#single-product" class="img-wrap"><img class="${product.dish.constructor.name}-style" src="${product.dish.image}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-12"> <a data-serial="${product.dish.name}" href="#single-product" class="title">${product.dish.name}</a> </div>
						</div>
					</figcaption>
				</figure>`);
      container.children[0].append(div);
    }
    container.insertAdjacentHTML('afterbegin', `<h1>Platos aleatorios</h1><br>`);
    this.dishes.append(container);
  }

  listProducts(products, title) {
    this.categories.replaceChildren();
    if (this.categories.children.length > 1) this.categories.children[1].remove();
    const container = document.createElement('div');
    container.id = 'product-list';
    container.classList.add('container');
    container.classList.add('my-3');
    container.insertAdjacentHTML('beforeend', '<div class="row"> </div>');

    for (const product of products) {
      const div = document.createElement('div');
      div.classList.add('col-md-4');
      div.insertAdjacentHTML('beforeend', `<figure class="card card-product-grid card-lg"> <a data-serial="${product.dish.name}" href="#single-product" class="img-wrap"><img class="${product.dish.constructor.name}-style" src="${product.dish.image}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-12"> <a data-serial="${product.dish.name}" href="#single-product" class="title">${product.dish.name}</a> </div>
							
						</div>
					</figcaption>
				</figure>`);
      container.children[0].append(div);
    }
    container.insertAdjacentHTML('afterbegin', `<h1>${title}</h1><br>`);
    this.categories.append(container);
  }

  listProductsMenu(products, title) {
    this.categories.replaceChildren();
    if (this.categories.children.length > 1) this.categories.children[1].remove();
    const container = document.createElement('div');
    container.id = 'product-list';
    container.classList.add('container');
    container.classList.add('my-3');
    container.insertAdjacentHTML('beforeend', '<div class="row"> </div>');

    for (const product of products) {
      const div = document.createElement('div');
      div.classList.add('col-md-4');
      div.insertAdjacentHTML('beforeend', `<figure class="card card-product-grid card-lg"> <a data-serial="${product.name}" href="#single-product" class="img-wrap"><img class="${product.constructor.name}-style" src="${product.image}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-8"> <a data-serial="${product.name}" href="#single-product" class="title">${product.name}</a> </div>
							<div class="col-md-4">
								<div class="rating text-right"> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> </div>
							</div>
						</div>
					</figcaption>
				</figure>`);
      container.children[0].append(div);
    }
    container.insertAdjacentHTML('afterbegin', `<h1>${title}</h1><br>`);
    this.categories.append(container);
  }

  bindProductsCategoryList(handler) {
    const categoryList = document.getElementById('category-list');
    const links = categoryList.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          '#product-list',
          { action: 'productsCategoryList', category },
          '#category-list',
          event,
        );
      });
    }
  }

  bindProductsCategoryListInMenu(handler) {
    const navCats = document.getElementById('navCats');
    const links = navCats.nextSibling.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          '#product-list',
          { action: 'productsCategoryList', category },
          '#category-list',
          event,
        );
      });
    }
  }

  bindProductsAllergenListInMenu(handler) {
    const navAllergens = document.getElementById('navAllergens');
    const links = navAllergens.nextSibling.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { allergen } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [allergen],
          '#product-list',
          { action: 'productsAllergenList', allergen },
          '#category-list',
          event,
        );
      });
    }
  }

  bindProductsMenuListInMenu(handler) {
    const navMenus = document.getElementById('navMenus');
    const links = navMenus.nextSibling.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { menu } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [menu],
          '#product-list',
          { action: 'productsMenuList', menu },
          '#category-list',
          event,
        );
      });
    }
  }

  bindRestaurantsInMenu(handler) {
    const navRest = document.getElementById('navRestaurants');
    const links = navRest.nextSibling.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { restaurant } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [restaurant],
          '#restaurantes',
          { action: 'restaurantsList', restaurant },
          '#restaurantes',
          event,
        );
      });
    }
  }



  showProduct(product, message) {
    this.dishes.replaceChildren();
    if (this.categories.children.length > 1) this.categories.children[1].remove();
    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('mt-5');
    container.classList.add('mb-5');

    if (product) {
      container.id = 'single-product';
      container.classList.add(`${product.constructor.name}-style`);
      container.insertAdjacentHTML('beforeend', `<div class="row d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="images p-3">
                  <div class="text-center p-4"> <img id="main-image" src="${product.image}"/> </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="product p-4">
                  <div class="mt-4 mb-3"> <span class="text-uppercase brand">${product.name}</span>
                    <h5 class="text-uppercase">${product.description}</h5>
                  </div>
                  <div class="sizes mt-5">
                    <h6 class="text-uppercase">Ingredientes</h6>
                  </div>
                  <div class="cart mt-4 align-items-center">${product.stringIngredientes()}</div>
                  <div class="cart mt-4 align-items-center">
										<button id="b-open" data-serial="${product.name}" class="btn btn-primary text-uppercase mr-2 px-4">Abrir en nueva ventana</button>
									</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`);
    } else {
      container.insertAdjacentHTML(
        'beforeend',
        `<div class="row d-flex justify-content-center">
        ${message}
      </div>`,
      );
    }
    this.dishes.append(container);
  }

  showProductInNewWindow(product, message) {
    const pos = this.productWindows.length - 1;
    const main = this.productWindows[pos].document.querySelector('main');
    const header = this.productWindows[pos].document.querySelector('header nav');
    main.replaceChildren();
    header.replaceChildren();
    let container;
    if (product) {
      this.productWindows[pos].document.title = `${product.name}`;
      header.insertAdjacentHTML('beforeend', `<h1 data-serial="${product.name}" class="display-5 mb-5">${product.name}</h1>`);
      container = document.createElement('div');
      container.id = 'single-product';
      container.classList.add(`${product.constructor.name}-style`);
      container.classList.add('container');
      container.classList.add('mt-5');
      container.classList.add('mb-5');
      container.insertAdjacentHTML('beforeend', `<div id="newWinProd" class="row d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="images p-3">
                  <div class="text-center p-4"> <img id="main-image" src="${product.image}"/> </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="product p-4">
                  <div class="mt-4 mb-3"> <span class="text-uppercase brand">${product.name}</span>
                    <h5 class="text-uppercase">${product.description}</h5>
                  </div>
                  <div class="sizes mt-5">
                    <h6 class="text-uppercase">Ingredientes</h6>
                  </div>
                  <div class="cart mt-4 align-items-center">${product.stringIngredientes()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`);
      container.insertAdjacentHTML('beforeend', '<button class="btn btn-primary text-uppercase m-2 px-4" onClick="window.close()">Cerrar</button>');
      main.append(container);
    } else {
      container = document.createElement('div');
      container.classList.add('container');
      container.classList.add('mt-5');
      container.classList.add('mb-5');
      container.insertAdjacentHTML('beforeend', `<div class="row d-flex justify-content-center">${message}</div>`);
    }
    main.append(container);
    this.productWindows[pos].document.body.scrollIntoView();
  }

  bindShowProduct(handler) {
    const productList = document.getElementById('product-list');
    const links = productList.querySelectorAll('a.img-wrap');
    for (const link of links) {
        link.addEventListener('click', (event) => {
          const { serial } = event.currentTarget.dataset;
          this[EXCECUTE_HANDLER](
            handler,
            [serial],
            '#single-product',
            { action: 'showProduct', serial },
            '#single-product',
            event,
          );
        });
    }
    const images = productList.querySelectorAll('figcaption a');
    for (const image of images) {
      image.addEventListener('click', (event) => {
        const { serial } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [serial],
          '#single-product',
          { action: 'showProduct', serial },
          '#single-product',
          event,
        );
      });
    }
  }

  bindShowRandProduct(handler) {
    const productList = document.getElementById('rand-list');
    const links = productList.querySelectorAll('a.img-wrap');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { serial } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [serial],
          '#single-product',
          { action: 'showRandProduct', serial },
          '#single-product',
          event,
        );
      });
    }
    const images = productList.querySelectorAll('figcaption a');
    for (const image of images) {
      image.addEventListener('click', (event) => {
        const { serial } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [serial],
          '#single-product',
          { action: 'showRandProduct', serial },
          '#single-product',
          event,
        );
      });
    }
  }

  bindShowProductInNewWindow(handler) {
    const pos = this.productWindows.length;
    const bOpen = document.getElementById('b-open');
    bOpen.addEventListener('click', (event) => {
        const newWindow = window.open('product.html', 'ProductWindow'+pos, 'width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no');

        this.productWindows.push(newWindow);
        newWindow.addEventListener('DOMContentLoaded', () => {
        handler(event.target.dataset.serial);
      });      
      
    });
  }

  closeWindows(){
    const bClose = document.getElementById('winCloser');
    bClose.addEventListener('click', (event) => {
      for (let i = 0; i < this.productWindows.length; i++) {
        this.productWindows[i].close();
      }
      this.productWindows = [];
    });
  }

  showAllergensInMenu(allergens) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navAllergens" role="button"
			data-bs-toggle="dropdown" aria-expanded="false">Alérgenos</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");

    for (const allergen of allergens) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-allergen="${allergen.name}" class="dropdown-item" href="#product-list">${allergen.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showMenusInMenu(menus) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navMenus" role="button"
			data-bs-toggle="dropdown" aria-expanded="false">Menús</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    for (const menu of menus) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-menu="${menu.menu.name}" class="dropdown-item" href="#product-list">${menu.menu.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showRestaurantsInMenu(restaurants) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navRestaurants" role="button"
			data-bs-toggle="dropdown" aria-expanded="false">Restaurantes</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    for (const restaurant of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-restaurant="${restaurant.name}" class="dropdown-item" href="#product-list">${restaurant.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  createWinCloser() {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("winCloser");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link href="#" id="winCloser">Cerrar Ventanas</a>`
    );
    this.menu.append(li);
  }

  showRestaurant(rest, title) {
    this.categories.replaceChildren();
    if (this.categories.children.length > 1) this.categories.children[1].remove();
    const container = document.createElement('div');
    container.id = 'restaurantes';
    container.classList.add('container');
    container.classList.add('my-3');
    container.insertAdjacentHTML('beforeend', '<div class="row"> </div>');

    
      const div = document.createElement('div');
      div.classList.add('col-md-4');
      div.insertAdjacentHTML('beforeend', `<div class="col-lg-3 col-md-6"><a data-restaurant="${rest.name}" href="#product-list">
      
      <div class="cat-list-text rest-info">
        <h3>Nombre - ${rest.name}</h3>
        <div>Descripción - ${rest.description}</div>
        <div>Localización - ${rest.location.toString()}</div>

      </div>
    </a>
  </div>`);
      container.children[0].append(div);

    container.insertAdjacentHTML('afterbegin', `<h1>${title}</h1><br>`);
    this.categories.append(container);
  }

  showAdminMenu() {
    const menuOption = document.createElement('li');
    menuOption.classList.add('nav-item');
    menuOption.classList.add('dropdown');
    menuOption.insertAdjacentHTML(
      'afterbegin',
      '<a class="nav-link dropdown-toggle" href="#" id="navServices" role="button" data-bs-toggle="dropdown" aria-expanded="false">	Adminitración</a>',
    );
    const suboptions = document.createElement('ul');
    suboptions.classList.add('dropdown-menu');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnewDish" class="dropdown-item" href="#new-dish">Crear Plato</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="ldelDish" class="dropdown-item" href="#del-dish">Eliminar Plato</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lassignsDishes" class="dropdown-item" href="#assigns-dishes">Asignar/Desasignar platos</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnewdelCategories" class="dropdown-item" href="#newdel-categories">Crear/Eliminar categorías</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnewRestaurant" class="dropdown-item" href="#new-restaurant">Crear Restaurante</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lmodCategories" class="dropdown-item" href="#mod-categories">Modificar Categorías</a></li>');
    menuOption.append(suboptions);
    this.menu.append(menuOption);
  }

  bindAdminMenu(hNewDish, hRemoveDish, hAssignsDishes, hNewRemoveCategory, hNewRestaurant, hModCategories) {
    const newDishLink = document.getElementById('lnewDish');
    newDishLink.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](hNewDish, [], '#new-dish', { action: 'newDish' }, '#', event);
    });

  }

  bindNewDishForm(handler) {
    newDishValidation(handler);
  }

  showNewDishForm(categories, allergens) {
    this.dishes.replaceChildren();
    if (this.dishes.children.length >= 1)
      this.dishes.children[0].remove();

    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('my-3');
    container.id = 'new-dish';

    const form = document.createElement('form');
    form.name = 'fNewDish';
    form.setAttribute('role', 'form');
    form.setAttribute('novalidate', '');
    form.classList.add('row');
    form.classList.add('g-3');

    container.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="display-5">Nuevo plato</h1>',
    );
    form.insertAdjacentHTML(
      'beforeend',`
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ndTitle">Nombre *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-type"></i></span>
					<input type="text" class="form-control" id="ndTitle" name="ndTitle"
						placeholder="Nombre del plato " value="" required>
					<div class="invalid-feedback">El nombre es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ndUrl">URL de la imagen *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-file-image"></i></span>
					<input type="url" class="form-control" id="ndUrl" name="ndUrl" placeholder="URL de la imagen"
						value="" required>
					<div class="invalid-feedback">La URL no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      <div class="col-md-6 mb-3">
				<label class="form-label" for="ndIngredients">Ingredientes</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="ndIngredients" name="ndIngredients" placeholder="Lechuga, bacon" value="" required>
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ndDescription">Descripción</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="ndDescription" name="ndDescription" value="">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      
      <div class="col-md-6 mb-3">
				<label class="form-label" for="ndCategories">Categoría</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="ndCategories" id="ndCategories" required>
            <option value = "" selected disabled></option>
					</select>
					<div class="invalid-feedback">El producto debe pertenecer al menos a una categoría.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      `);
      const ndCategories = form.querySelector('#ndCategories');
      for (const category of categories) {
        ndCategories.insertAdjacentHTML('beforeend', `<option value="${category.name}">${category.name}</option>`);
      }
      form.insertAdjacentHTML(
        'beforeend',`
      <div class="col-md-6 mb-3">
				<label class="form-label" for="ndAllergens">Alérgenos</label>
			  <div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="ndAllergens" id="ndAllergens" multiple required>
					</select>
					<div class="invalid-feedback">El producto debe tener algún alérgeno.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      `);
      const ndAllergens = form.querySelector('#ndAllergens');
      for (const allergen of allergens) {
        ndAllergens.insertAdjacentHTML('beforeend', `<option value="${allergen.name}">${allergen.name}</option>`);
      }
      form.insertAdjacentHTML(
        'beforeend',`
			<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</div>`,
    );
    container.append(form);
    this.dishes.append(container);
  }

  showNewDishModal(done, dish, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Nuevo Plato';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido creado correctamente.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${dish.name}</strong> ya está creado.</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewDish.reset();
      }
      document.fNewDish.ndTitle.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }
}

export default RestaurantView;