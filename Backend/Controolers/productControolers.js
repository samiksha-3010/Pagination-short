import ProductModal from "../Models/ProductModal.js";
export const  AddProduct = async (req,res)=>{
    try {
        const { name, price, image, category } = req.body;
        const { token } = req.body;
        if (!name || !price || !image || !category || !token) return res.status(404).json({ success: false, message: "All fields are mandtory.." })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ success: false, message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const product = new ProductModal({ name, price, image, category, userId: userId });
        await product.save();

        return res.status(201).json({ success: true, message: "Product Created Successfull." })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
};

export  const allProduct = async (req,res)=>{
    try {
       
        const products = await ProductModal.find({});
        // console.log(products, "products")
        if (products.length) {
            return res.status(200).json({ success: true, products: products })
        }
        return res.status(404).json({ success: false, message: "No products found" })

    } catch (error) {
        console.log(error, "error in all product")
        return res.status(500).json({ success: false, error: error.message })
    }
  
}
export const getYourProducts = async(req,res)=>{

    try {
        const { token } = req.body;

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ success: false, message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const yourProducts = await ProductModal.find({ userId: userId })

        if (yourProducts.length) {
            return res.status(200).json({ success: true, products: yourProducts })
        }

        return res.status(404).json({ success: false, message: "No products found." })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }

}