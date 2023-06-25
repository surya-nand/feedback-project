import React from "react";
import "../Footer/Footer.css";
import arrowimg from "./../../Assets/arrow.png";
import axios from "axios";
import { useEffect, useState } from "react";
import whitecomment from "./../../Assets/whitecomment.png";
import blackcomment from "./../../Assets/Blackcomment.png";
import { useLocation, useNavigate } from "react-router";
import Emailimg from "./../../Assets/emailimg.png";
import Passwordimg from "./../../Assets/passwordimg.png";
import Mobileimg from "./../../Assets/mobileimg.png";
import Nameimg from "./../../Assets/nameimg.png";
import Enterimg from "./../../Assets/enterimg.png";
const Base_URL = "https://feedback-server-rn39.onrender.com";

const Footer = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    CompanyName: "",
    Category: "",
    logoUrl: "",
    Link: "",
    Description: "",
    Upvotes: 0,
    CommentsCount: 0,
    Comments: "",
  });

  const [signupData, setSignupData] = useState({
    SignupName: "",
    SignupEmail: "",
    SignupMobile: "",
    SignupPassword: "",
  });

  const [loginData, setLoginData] = useState({
    LoginEmail: "",
    LoginPassword: "",
  });

  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${Base_URL}/api/users`)
      .then((res) => {
        let users_data = res.data;
        setRegisteredUsers(users_data);
      })
      .catch((error12) => {
        console.log(error12);
      });
  }, []);

  // const navigate = useNavigate();
  const location = useLocation();
  const loggedInUser = location.state && location.state.loggedInUser;
  const [products, setProducts] = useState([]);
  // const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isAddProductFormOpen, setIsAddProductFormOpen] = useState(false);
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(0);
  const [isEditProductFormOpen, setIsEditProductFormOpen] = useState(false);
  const [allproducts, setAllproducts] = useState([]);

  const [updatedProductData, setUpdatedProductData] = useState([]);

  const [isSortingOpen, setIsSortingOpen] = useState(false);

  // const [categories, setCategories] = useState([])
  useEffect(() => {
    axios

      .get(`${Base_URL}/api/products`)
      .then((res) => {
        let products_data = res.data;
        setProducts(products_data);
        setAllproducts(products_data);
      })
      .catch((error5) => {
        console.log(error5);
      });
  }, []);

  const handleBlackCommentButton = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product._id === productId) {
          return { ...product, isCommentOpen: !product.isCommentOpen };
        }
        return product;
      })
    );
  };

  const handleEditProductButton = (productId) => {
    if (loggedInUser) {
      const product = products.find((product) => product._id === productId);
      setUpdatedProductData(product);
      setIsEditProductFormOpen(true);

      const UpdatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(UpdatedProducts);
      document.body.style.overflow = "hidden";
    } else {
      window.alert("Please signup to edit your product");
      setIsSignupFormOpen(true);
      document.body.style.overflow = "hidden";
    }
  };
  const handleSubmitEditProductFormButton = async (e5) => {
    e5.preventDefault();
    await fetch(`${Base_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProductData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error17) => {
        console.error("Error:", error17);
      });
    setIsEditProductFormOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleAddProduct = () => {
    if (loggedInUser) {
      setIsAddProductFormOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      window.alert("Please signup to add your product");
      setIsSignupFormOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  const handleLoginFormButton = (event1) => {
    event1.preventDefault();
    setIsLoginFormOpen(!isLoginFormOpen);
  };

  function handleSorting() {
    setIsSortingOpen(!isSortingOpen);
    setProducts(allproducts);
  }

  function handleUpvotesSortButton() {
    const sortedUpvoteProducts = [...products].sort(
      (a, b) => b.Upvotes - a.Upvotes
    );
    setProducts(sortedUpvoteProducts);
  }

  function handleCommentsSortButton() {
    const sortedCommentProducts = [...products].sort(
      (a, b) => b.CommentsCount - a.CommentsCount
    );
    setProducts(sortedCommentProducts);
  }
  const handleUpvoteButton = async (productId) => {
    if (loggedInUser) {
      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          if (product._id === productId) {
            const updatedProduct = {
              ...product,
              Upvotes: product.Upvotes + 1,
            };
            updateProductInDatabase(productId, updatedProduct.Upvotes);
            return updatedProduct;
          }
          return product;
        })
      );
    } else {
      window.alert("Please log in to upvote a product.");
      navigate("/login");
    }
  };

  const updateProductInDatabase = async (productId, updatedUpvotes) => {
    try {
      const response = await fetch(`${Base_URL}/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Upvotes: updatedUpvotes }),
      });

      if (!response.ok) {
        // Handle the error if product update fails
        const error = await response.json();
        throw new Error(error.msg);
      }
    } catch (error15) {
      console.error("Failed to update product details:", error15);
    }
  };

  const uniqueCategories = Array.from(
    new Set(products.flatMap((product) => product.Category[0].split(",")))
  );
  // console.log(uniqueCategories)
  const handleFilterCategory = (e2) => {
    e2.preventDefault();
    const category = e2.target.textContent.trim();
    const filteredProducts = allproducts.filter((product) =>
      product.Category[0].includes(category)
    );
    setProducts(filteredProducts);
    setSuggestions(filteredProducts.length);
  };

  const handleFilterAllcategory = (e3) => {
    e3.preventDefault();
    setSuggestions(allproducts.length);
    setProducts(allproducts);
  };

  async function handleSignupFormButton(event2) {
    event2.preventDefault();
    const existingUser1 = registeredUsers.find(
      (user) => user.SignupEmail === signupData.SignupEmail
    );
    if (existingUser1) {
      window.alert("User already exists.Please Login");
      navigate("/login");
    } else {
      await fetch(`${Base_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate("/", {
            // Pass the newly created user data as props to the `/` page
            state: {
              loggedInUser: data,
            },
          });
          console.log(data);
        })
        .catch((error13) => {
          console.error("Error:", error13);
        });
      setIsSignupFormOpen(false);
      document.body.style.overflow = "auto";
    }
  }

  async function handleLoginForm(event8) {
    event8.preventDefault();
    const existingUser = registeredUsers.find(
      (user) => user.SignupEmail === loginData.LoginEmail
    );
    if (!existingUser) {
      window.alert("User doesnot exist. Please register first");
      navigate("/signup");
    } else if (existingUser.SignupPassword === loginData.LoginPassword) {
      setIsLoginFormOpen(false)
      setIsSignupFormOpen(false)
      document.body.style.overflow = "auto";
      window.alert(`welocme ${existingUser.SignupName}!`);
      navigate("/", {
        state: {
          loggedInUser: existingUser,
        },
      });
    } else {
      window.alert("Please enter correct password");
    }
  }

  const handleInputChange = (event5) => {
    const { name, value } = event5.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange1 = (event6) => {
    const { name, value } = event6.target;
    setSignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange2 = (event6) => {
    const { name, value } = event6.target;
    setUpdatedProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange3 = (event6) => {
    const { name, value } = event6.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleCommentInputChange = (event7) => {
    const { value } = event7.target;
    setProductData((prevData) => ({
      ...prevData,
      Comments: [value],
    }));
  };

  const handleEnterComment = async (productId) => {
    if (loggedInUser) {
      if (productData.Comments[0]) {
        const updatedProducts = products.map((p) => {
          if (p._id === productId) {
            const newComment = productData.Comments[0];
            const updatedComments = [...p.Comments, [newComment]]; // Create a new array with the new comment
            updateCommentsInDatabase(productId, updatedComments);

            return {
              ...p,
              Comments: updatedComments,
              CommentsCount: p.CommentsCount + 1,
            };
          }
          return p;
        });

        setProducts(updatedProducts);
        setProductData((prevData) => ({
          ...prevData,
          Comments: [""],
        }));
      }
    } else {
      window.alert("Please login to enter comments");
      navigate("/login");
    }
  };

  const updateCommentsInDatabase = async (productId, updatedComments) => {
    try {
      const latestComment = updatedComments[updatedComments.length - 1];
      const response = await fetch(`${Base_URL}/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Comments: latestComment }),
      });

      if (!response.ok) {
        // Handle the error if comments update fails
        const error16 = await response.json();
        throw new Error(error16.msg);
      }
    } catch (error) {
      console.error("Failed to update comments:", error);
    }
  };

  async function handleProductFormButton(e) {
    e.preventDefault();
    await fetch(`${Base_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error11) => {
        console.error("Error:", error11);
      });
    setIsAddProductFormOpen(false);
    document.body.style.overflow = "auto";
  }

  return (
    <div className={`footer-component ${isAddProductFormOpen ? "blur" : ""}`}>
      {isAddProductFormOpen && <div className="add-product-overlay"></div>}
      {isSignupFormOpen && <div className="add-product-overlay"></div>}
      {isEditProductFormOpen && <div className="add-product-overlay"></div>}
      {isLoginFormOpen && <div className="add-product-overlay"></div>}
      <div className="feedback-component-filter">
        <div className="feedback-component-filter-block">
          <h1>Feedback</h1>
          <p>Apply filter</p>
        </div>
        <div className="feedback-component-filter-options">
          <button
            onClick={handleFilterAllcategory}
            className="filter-all-button"
          >
            <div className="filter-all">
              <p>All</p>
            </div>
          </button>

          {/* {products.map((product2, index2) => (
            <div className="filter-category-element" key={product2._id}>
              {product2.Category[0].split(",").map((category2, key2) => (
                <button
                  onClick={handleFilterCategory}
                  className="filter-category-button"
                >
                  <div
                    className="filter-category"
                    style={{
                      width: `${category2.trim().length * 12}px`,
                    }}
                  >
                    <span key={key2}>{category2}</span>
                  </div>
                </button>
              ))}
            </div>

          ))} */}
          <div className="filter-category-elements-container">
            {uniqueCategories.map((category, index) => (
              <div className="filter-category-element">
                <button
                  onClick={handleFilterCategory}
                  className="filter-category-button"
                  key={index}
                >
                  <div
                    className="filter-category"
                    style={{
                      width: `${category.trim().length * 12}px`,
                    }}
                  >
                    <span>{category}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="product-recomendations">
        <h1>{suggestions} Suggestions</h1>
        <p>Sort by:</p>
        {/* <h2>Upvotes</h2> */}
        <button className="product-recomendations-arrowimg">
          <img onClick={handleSorting} src={arrowimg} alt="arrowimg"></img>
        </button>
        {isSortingOpen && (
          <div className="sorting-options">
            <button
              className="upvotes-sort-button"
              onClick={handleUpvotesSortButton}
            >
              <div className="upvotes-sort">Upvotes</div>
            </button>
            <button
              className="comments-sort-button"
              onClick={handleCommentsSortButton}
            >
              <div className="comments-sort">Comments</div>
            </button>
          </div>
        )}
        <button
          onClick={handleAddProduct}
          className="product-recomendations-add-product"
        >
          + Add product
        </button>
      </div>
      <div className="products">
        {products.map((product, index) => (
          <div
            key={index}
            className={`product-card ${
              product.isCommentOpen ? "expanded" : ""
            }`}
          >
            <div className="product-logo">
              <img
                class="product-logo-image"
                src={product.logoUrl}
                alt="product-logo"
              ></img>
            </div>
            <div className="product-title">
              <h1>{product.CompanyName}</h1>
            </div>
            <div className="product-description">
              <p>{product.Description}</p>
            </div>
            <div className="product-categories">
              {product.Category[0].split(",").map((category, key) => (
                <div className="product-categories-element">
                  <span key={key}>{category}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleBlackCommentButton(product._id)}
              className="product-comment-category-button"
            >
              <div className="product-comment-category">
                <img
                  className="whitecomment"
                  src={whitecomment}
                  alt="whitecomment"
                ></img>
                <p>Comment</p>
              </div>
            </button>
            <div className="product-upvote-comment">
              <div key={product._id} className="product-upvotes">
                <button
                  onClick={() => handleUpvoteButton(product._id)}
                  className="arrowimg2-button"
                >
                  <img
                    className="arrowimg2"
                    src={arrowimg}
                    alt="arrowimg2"
                  ></img>
                </button>
                <p>{product.Upvotes}</p>
              </div>
              <div key={product._id} className="product-comment">
                <p>{product.CommentsCount}</p>
                <button
                  // onClick={() => handleBlackCommentButton(product._id)}
                  className="blackcomment-button"
                >
                  <img
                    className="blackcomment-img"
                    src={blackcomment}
                    alt="Blackcomment"
                  ></img>
                </button>
              </div>
            </div>
            {product.isCommentOpen && (
              <div key={product.id} className="comments-open">
                <button
                  onClick={() => handleEditProductButton(product._id)}
                  className="edit-product-button"
                >
                  <div className="edit-product-section">
                    <p>Edit</p>
                  </div>
                </button>
                <input
                  className="comment-input"
                  type="name"
                  placeholder="Add a comment...."
                  name="Comments"
                  value={productData.Comments[0]}
                  onChange={handleCommentInputChange}
                ></input>
                <button
                  onClick={() => handleEnterComment(product._id)}
                  className="enter-img-button"
                >
                  <img
                    className="enter-img"
                    src={Enterimg}
                    alt="enter-img"
                  ></img>
                </button>
                <div className="comment-section">
                  {product.Comments.map((comment, key) => (
                    <div className="product-comments-element">
                      <div className="comment-dot"></div>
                      <p className="product-each-comment" key={key}>
                        {comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {isAddProductFormOpen && (
        <form method="POST" onSubmit={handleProductFormButton}>
          <div className="add-product-form">
            <div className="product-details">
              <h1>Add your product</h1>
              <input
                className="company-name"
                type="name"
                name="CompanyName"
                required
                placeholder="Name of the company"
                value={productData.CompanyName}
                onChange={handleInputChange}
              ></input>
              <div className="product-line"></div>
              <input
                className="company-category"
                type="category"
                name="Category"
                required
                placeholder="Category"
                value={productData.Category}
                onChange={handleInputChange}
              ></input>
              <div className="product-line1"></div>
              <input
                className="company-logo-url"
                type="url"
                name="logoUrl"
                required
                placeholder="Add logo url"
                value={productData.logoUrl}
                onChange={handleInputChange}
              ></input>
              <div className="product-line2"></div>
              <input
                className="company-product-link"
                type="url"
                name="Link"
                required
                placeholder="Link of product"
                value={productData.Link}
                onChange={handleInputChange}
              ></input>
              <div className="product-line3"></div>
              <input
                className="company-description"
                type="text"
                name="Description"
                required
                placeholder="Add Description"
                value={productData.Description}
                onChange={handleInputChange}
              ></input>
              <div className="product-line4"></div>
              <button type="submit" className="add-product-form-button">
                +Add
              </button>
            </div>
            <div className="website-details">
              <h1 className="website-title">Feedback</h1>
              <p className="website-description">
                Add your
                <br />
                product and
                <br />
                rate other
                <br />
                items.....
              </p>
            </div>
          </div>
        </form>
      )}
      {isEditProductFormOpen && (
        <form method="POST" onSubmit={handleSubmitEditProductFormButton}>
          <div className="add-product-form">
            <div className="product-details">
              <h1>Update product</h1>
              <input
                className="company-name"
                type="name"
                name="CompanyName"
                placeholder="Name of the company"
                value={updatedProductData.CompanyName}
                onChange={handleInputChange2}
              ></input>
              <div className="product-line"></div>
              <input
                className="company-category"
                type="category"
                name="Category"
                placeholder="Category"
                value={updatedProductData.Category}
                onChange={handleInputChange2}
              ></input>
              <div className="product-line1"></div>
              <input
                className="company-logo-url"
                type="url"
                name="logoUrl"
                placeholder="Add logo url"
                value={updatedProductData.logoUrl}
                onChange={handleInputChange2}
              ></input>
              <div className="product-line2"></div>
              <input
                className="company-product-link"
                type="url"
                name="Link"
                placeholder="Link of product"
                value={updatedProductData.Link}
                onChange={handleInputChange2}
              ></input>
              <div className="product-line3"></div>
              <input
                className="company-description"
                type="text"
                name="Description"
                placeholder="Add Description"
                value={updatedProductData.Description}
                onChange={handleInputChange2}
              ></input>
              <div className="product-line4"></div>
              <button type="submit" className="add-product-form-button">
                Update
              </button>
            </div>
            <div className="website-details">
              <h1 className="website-title">Feedback</h1>
              <p className="website-description">
                Add your
                <br />
                product and
                <br />
                rate other
                <br />
                items.....
              </p>
            </div>
          </div>
        </form>
      )}
      {isSignupFormOpen && (
        <form method="POST" onSubmit={handleSignupFormButton}>
          <div className="add-signup-form">
            <div className="signup-data"></div>
            <div className="signup-details">
              <h1>Signup to continue</h1>
              <img className="name-img" src={Nameimg} alt="form-name"></img>
              <input
                className="user-name"
                type="name"
                name="SignupName"
                required
                placeholder="Name"
                value={signupData.SignupName}
                onChange={handleInputChange1}
              ></input>
              <div className="signup-line"></div>
              <img className="email-img" src={Emailimg} alt="form-email"></img>
              <input
                className="user-email"
                type="email"
                name="SignupEmail"
                required
                placeholder="Email"
                value={signupData.SignupEmail}
                onChange={handleInputChange1}
              ></input>
              <div className="signup-line1"></div>
              <img
                className="mobile-img"
                src={Mobileimg}
                alt="mobile-img"
              ></img>
              <input
                className="user-mobile"
                type="tel"
                minLength="10"
                maxLength="10"
                name="SignupMobile"
                value={signupData.SignupMobile}
                required
                placeholder="Mobile"
                onChange={handleInputChange1}
              ></input>
              <div className="signup-line2"></div>
              <img
                className="password-img"
                src={Passwordimg}
                alt="password-img"
              ></img>
              <input
                className="user-password"
                type="password"
                name="SignupPassword"
                value={signupData.SignupPassword}
                minLength="5"
                required
                placeholder="Password"
                onChange={handleInputChange1}
              ></input>
              <div className="signup-line3"></div>
              <div className="Account-form-login">
                <p>Already have an account?</p>
                <button
                  onClick={handleLoginFormButton}
                  className="login-form-button"
                >
                  <h1>Log in</h1>
                </button>
              </div>
              <button type="submit" className="signup-form-button">
                Signup
              </button>
            </div>
            <div className="website-details">
              <h1 className="website-title">Feedback</h1>
              <p className="website-description">
                Add your
                <br />
                product and
                <br />
                rate other
                <br />
                items.....
              </p>
            </div>
          </div>
        </form>
      )}
      {isLoginFormOpen && (
        <form method="POST" onSubmit={handleLoginForm}>
          <div className="add-signup-form">
            <div className="signup-data"></div>
            <div className="signup-details">
              <h1>Login to continue</h1>
              <img className="name-img" src={Emailimg} alt="form-name"></img>
              <input
                className="user-name"
                type="email"
                name="LoginEmail"
                required
                placeholder="Email"
                value={loginData.LoginEmail}
                onChange={handleInputChange3}
              ></input>
              <div className="signup-line"></div>
              <img className="email-img" src={Passwordimg} alt="form-email"></img>
              <input
                className="user-email"
                type="password"
                name="LoginPassword"
                required
                placeholder="Password"
                value={loginData.LoginPassword}
                onChange={handleInputChange3}
              ></input>
              <div className="signup-line1"></div>
              <button type="submit" className="signup-login-form-button">
                Login
              </button>
            </div>
            <div className="website-details">
              <h1 className="website-title">Feedback</h1>
              <p className="website-description">
                Add your
                <br />
                product and
                <br />
                rate other
                <br />
                items.....
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Footer;
