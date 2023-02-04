import { Container } from "@mui/system";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function EditProductsForm({ products, setProducts }) {
  const URL = "http://localhost:8080/products";

  const productData = useLocation();
  const navigate = useNavigate();

  const [currentProduct, setCurrentProduct] = useState(
    productData.state.product[0]
  );

  function handlePname(e) {
    setCurrentProduct({ ...currentProduct, productname: e.target.value });
  }
  function handlePrice(e) {
    setCurrentProduct({ ...currentProduct, price: e.target.value });
  }
  function handleStock(e) {
    setCurrentProduct({ ...currentProduct, stock: e.target.value });
  }
  function handleColor(e) {
    setCurrentProduct({ ...currentProduct, color: e.target.value });
  }
  function handleCategory(e) {
    setCurrentProduct({ ...currentProduct, category: e.target.value });
  }
  function handleDescription(e) {
    setCurrentProduct({ ...currentProduct, description: e.target.value });
  }

  async function handleEdit(e) {
    e.preventDefault();

    const putProductData = {
      id: currentProduct.id,
      productname: currentProduct.productname,
      price: currentProduct.price,
      stock: currentProduct.stock,
      color: currentProduct.color,
      category: currentProduct.category,
      description: currentProduct.description,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putProductData),
    };
    const FETCHED_DATA = await fetch(URL, options);
    const FETCHED_JSON = await FETCHED_DATA.json();
    setProducts(FETCHED_JSON.data);

    navigate("/productlist");
  }

  return (
    <Container maxWidth="lg" sx={{ margin: "0 auto", paddingBottom: 5 }}>
      <Typography variant="h3" sx={{ marginBottom: 2 }}>
        EDIT PRODUCT
      </Typography>
      {currentProduct && (
        <Box maxWidth="md" sx={{ margin: "0 auto" }}>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
            fullWidth={true}
          >
            <TextField
              name={"productname"}
              type={"text"}
              label={"Product name"}
              variant={"filled"}
              fullWidth={true}
              defaultValue={currentProduct.productname}
              onChange={handlePname}
            />
            <TextField
              name={"price"}
              type={"text"}
              label={"Price"}
              variant={"filled"}
              fullWidth={true}
              defaultValue={currentProduct.price}
              onChange={handlePrice}
            />
            <TextField
              name={"stock"}
              type={"number"}
              label={"Stock"}
              variant={"filled"}
              fullWidth={true}
              defaultValue={currentProduct.stock}
              onChange={handleStock}
            />
            <TextField
              name={"color"}
              type={"text"}
              label={"Color"}
              variant={"filled"}
              fullWidth={true}
              defaultValue={currentProduct.color}
              onChange={handleColor}
            />
            <TextField
              name={"category"}
              type={"text"}
              label={"Category"}
              variant={"filled"}
              fullWidth={true}
              defaultValue={currentProduct.category}
              onChange={handleCategory}
            />
            <TextField
              name={"description"}
              type={"text"}
              label={"Description"}
              variant={"filled"}
              fullWidth={true}
              defaultValue={currentProduct.description}
              onChange={handleDescription}
            />
          </FormControl>

          <Button
            type="submit"
            variant={"outlined"}
            sx={{ marginTop: 2 }}
            color={"success"}
            onClick={handleEdit}
          >
            SAVE
          </Button>
        </Box>
      )}
    </Container>
  );
}
