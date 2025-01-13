import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

function ProductSection() {
  const [products, setProducts] = useState([]);
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
  console.log(products, "productssssssssssss");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/admin/products"
      );
      setProducts(response.data.data);
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
    // Client-side validation to check that required fields are filled
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
        // Edit existing product
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
        // Add new product
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

  //Delete product
  const handleDeleteProduct = async (_id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/admin/products/delete/${_id}`
      );
      setProducts((prev) => prev.filter((product) => product._id !== _id));
      toast.success("Product deleted successfully!");
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
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Product Management
          </h1>
          <div className="flex justify-end mb-4">
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
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Author</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  products?.map((product) => (
                    <tr key={product?._id} className="hover:bg-gray-100">
                      <td className="py-3 px-4">{product?.name}</td>
                      <td className="py-3 px-4">{product?.author}</td>
                      <td className="py-3 px-4">{product?.category}</td>
                      <td className="py-3 px-4">${product?.price}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <CiEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
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
                    {[
                      "name",
                      "description",
                      "category",
                      "price",
                      "image",
                      "author",
                    ].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {field}
                        </label>
                        <input
                          type={
                            field === "price" || field === "quantity"
                              ? "number"
                              : "text"
                          }
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
