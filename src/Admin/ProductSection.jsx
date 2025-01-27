import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [formdata, setFormdata] = useState({
    _id: "",
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
    author: "",
  });
  const [editmode, setEditmode] = useState(false);
  const [modelopen, setModelopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/admin/products"
      );
      setProducts(response.data.data);
      // Extract unique categories
      const uniqueCategories = [
        "All",
        ...new Set(response.data.data.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.log("Failed to load products", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProduct = async () => {
    if (
      !formdata.name ||
      !formdata.author ||
      !formdata.price ||
      !formdata.category
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const { _id, ...data } = formdata;
    try {
      if (editmode) {
        await axios.put(
          `http://localhost:3000/api/admin/products/edit/${_id}`,
          data
        );
        setProducts((prev) =>
          prev?.map((product) =>
            product._id === _id ? { ...product, ...data } : product
          )
        );
        toast.success("Product updated successfully!");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/admin/addProduct",
          data
        );
        setProducts((prev) => [...prev, response.data]);
        toast.success("Product added successfully!");
      }
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product!");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/admin/products/delete/${confirmDelete}`
      );
      setProducts((prev) =>
        prev.filter((product) => product._id !== confirmDelete)
      );
      toast.success("Product deleted successfully!");
      setConfirmDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product!");
    }
  };

  const handleEditClick = (product) => {
    setFormdata({ ...product });
    setEditmode(true);
    setModelopen(true);
  };

  const resetForm = () => {
    setFormdata({
      _id: "",
      name: "",
      description: "",
      category: "",
      price: "",
      image: "",
      author: "",
    });
    setEditmode(false);
    setModelopen(false);
  };

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Product Management
          </h1>
          <div className="flex justify-between mb-4">
            <select
              className="border border-gray-300 rounded-md px-4 py-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              onClick={() => setModelopen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 focus:outline-none"
            >
              Add Product
            </button>
          </div>

          {/* Product List */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Author</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  currentProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-100">
                      <td className="py-3 px-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </td>
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">{product.author}</td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">${product.price}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <CiEdit />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(product._id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Confirmation Box */}
          {confirmDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Are you sure you want to delete this product?
                </h2>
                <div className="flex gap-4">
                  <button
                    onClick={handleDeleteProduct}
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === index + 1
                    ? "bg-sky-950 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Modal */}
          {modelopen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-semibold text-blue-600">
                    {editmode ? "Edit Product" : "Add Product"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-red-600 focus:outline-none"
                  >
                    ✖
                  </button>
                </div>
                <div className="p-4">
                  <form className="space-y-4">
                    {["name", "description", "category", "price", "image", "author"].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {field}
                        </label>
                        <input
                          type={field === "price" ? "number" : "text"}
                          name={field}
                          value={formdata[field]}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                    ))}
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={handleSaveProduct}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="bg-gray-400 text-white px-4 py-2 rounded-md w-full"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProductSection;

