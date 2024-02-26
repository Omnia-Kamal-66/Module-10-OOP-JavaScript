class Product {
  /*  title = "default";
  imageUrl;
  description;
  price;
 */
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}
class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }
  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `  <h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>
    `;
  }

  get totalAmount() {
    const sum = this.items.reduce((prevValue, curItem) => {
      return prevValue + curItem.price;
    }, 0);

    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  orderProducts() {
    console.log("ordering");
    console.log(this.items);
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
  <h2>Total: \$${0}</h2>
  <button>Order Now!</button>
  
  `;
    const orderButton = cartEl.querySelector("button");
    orderButton.addEventListener("click", this.orderProducts.bind(this));
    this.totalOutput = cartEl.querySelector("h2");
  }
}

class ProductItem extends Component {
  constructor(Product, renderHookId) {
    super(renderHookId, false);
    this.product = Product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }
  render() {
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
          <div>
           <img src = "${this.product.imageURL}" alt =  "${this.product.title}">
            <div class = "product-item__content">
             <h2>${this.product.title}</h2>
             <h3>${this.product.price}</h3>
             <p>${this.product.description}</p>
             <button>Add to Cart</button>
             </div>
          
          </div>
          
          `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  #products = [];

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.fetchProducts();
  }

  fetchProducts() {
    this.#products = [
      new Product(
        "A Pillow",
        "https://www.google.com/search?sca_esv=8b0f0bb61a9c22c4&rlz=1C1GCEU_enEG1089EG1089&sxsrf=ACQVn0864SLUmMhMDAVPiKdN3z2oUNdGzQ:1707498541598&q=pillow+pic&tbm=isch&source=lnms&sa=X&ved=2ahUKEwiI1Zrg356EAxVrTaQEHbzKC4YQ0pQJegQICRAB&biw=1920&bih=919&dpr=1#imgrc=4Lip-WjrqfyJVM",
        " A soft pillow!",
        19.99
      ),
      new Product(
        "A carpet",
        "https://www.google.com/search?q=carpet&tbm=isch&ved=2ahUKEwjxkeXi356EAxU8UKQEHdzbAIAQ2-cCegQIABAA&oq=carpet&gs_lp=EgNpbWciBmNhcnBldDIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEiSE1D0B1jDEXAAeACQAQCYAZ8BoAGdB6oBAzAuN7gBA8gBAPgBAYoCC2d3cy13aXotaW1nwgIEECMYJ8ICCBAAGIAEGLEDiAYB&sclient=img&ei=M1zGZbEsvKCR1Q_ct4OACA&bih=919&biw=1920&rlz=1C1GCEU_enEG1089EG1089#imgrc=wjLvSyvYwkTF5M",
        " A soft carpet!",
        98.99
      ),
    ];

    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.#products) {
      new ProductItem(prod, "prod-list");
    }
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}
class Shop {
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart("app");
    new ProductList("app");
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(prouct) {
    this.cart.addProduct(prouct);
  }
}

App.init();
