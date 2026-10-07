import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";

function Products() {
  const { productList, setProductList } = useContext(AdminContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "shoes",
  });

  const filteredProducts = productList.filter(function (product) {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  function validateProduct(product) {
    if (!product.name.trim()) {
      alert("Product name is required.");
      return false;
    }

    if (product.price === "" || Number(product.price) < 0) {
      alert("Price must be 0 or greater.");
      return false;
    }

    if (product.stock === "" || Number(product.stock) < 0) {
      alert("Stock must be 0 or greater.");
      return false;
    }

    if (!product.category) {
      alert("Please select a category.");
      return false;
    }

    return true;
  }

  function handleSave(event) {
    event.preventDefault();

    if (!validateProduct(editingProduct)) {
      return;
    }

    setProductList(
      productList.map(function (product) {
        if (product.id === editingProduct.id) {
          return {
            ...editingProduct,
            name: editingProduct.name.trim(),
            price: Number(editingProduct.price),
            stock: Number(editingProduct.stock),
          };
        }

        return product;
      }),
    );

    setEditingProduct(null);
  }

  function handleAddProduct(event) {
    event.preventDefault();

    if (!validateProduct(newProduct)) {
      return;
    }

    const product = {
      ...newProduct,
      id: Date.now(),
      name: newProduct.name.trim(),
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
    };

    setProductList([...productList, product]);

    setNewProduct({
      name: "",
      price: "",
      stock: "",
      category: "shoes",
    });

    setShowAddForm(false);
  }

  function handleDeleteProduct(productId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    setProductList(
      productList.filter(function (product) {
        return product.id !== productId;
      }),
    );
  }

  return (
    <main className="dashboard">
      <div className="products-header">
        <div>
          <h1>Products</h1>
          <p>Manage your CODEE products here.</p>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button
          className="add-product-button"
          onClick={() => setShowAddForm(true)}
        >
          Add Product
        </button>
      </div>

      <div className="product-filters">
        <button onClick={() => setCategory("all")}>All</button>

        <button onClick={() => setCategory("shoes")}>Shoes</button>

        <button onClick={() => setCategory("watch")}>Watches</button>

        <button onClick={() => setCategory("cloth")}>Clothes</button>
      </div>

      {showAddForm && (
        <div className="edit-box">
          <h2>Add Product</h2>

          <form onSubmit={handleAddProduct}>
            <input
              type="text"
              placeholder="Product name"
              value={newProduct.name}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  name: event.target.value,
                })
              }
              required
            />

            <input
              type="number"
              min="0"
              placeholder="Price"
              value={newProduct.price}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  price: event.target.value,
                })
              }
              required
            />

            <input
              type="number"
              min="0"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  stock: event.target.value,
                })
              }
              required
            />

            <select
              value={newProduct.category}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  category: event.target.value,
                })
              }
            >
              <option value="shoes">Shoes</option>
              <option value="watch">Watches</option>
              <option value="cloth">Clothes</option>
            </select>

            <button type="submit">Add Product</button>

            <button type="button" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {editingProduct && (
        <div className="edit-box">
          <h2>Edit Product</h2>

          <form onSubmit={handleSave}>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(event) =>
                setEditingProduct({
                  ...editingProduct,
                  name: event.target.value,
                })
              }
              required
            />

            <input
              type="number"
              min="0"
              value={editingProduct.price}
              onChange={(event) =>
                setEditingProduct({
                  ...editingProduct,
                  price: event.target.value,
                })
              }
              required
            />

            <input
              type="number"
              min="0"
              value={editingProduct.stock}
              onChange={(event) =>
                setEditingProduct({
                  ...editingProduct,
                  stock: event.target.value,
                })
              }
              required
            />

            <button type="submit">Save Changes</button>

            <button type="button" onClick={() => setEditingProduct(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="products-table">
        <div className="table-header">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try changing your search or category filter.</p>
          </div>
        ) : (
          filteredProducts.map(function (product) {
            let status = "In Stock";

            if (product.stock === 0) {
              status = "Out of Stock";
            } else if (product.stock <= 3) {
              status = "Low Stock";
            }

            return (
              <div className="table-row" key={product.id}>
                <span>{product.name}</span>
                <span>{product.category}</span>
                <span>₦{Number(product.price).toLocaleString()}</span>
                <span>{product.stock}</span>
                <span>{status}</span>

                <div className="product-actions">
                  <button onClick={() => setEditingProduct(product)}>
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}

export default Products;
