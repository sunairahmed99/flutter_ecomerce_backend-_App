import cloudinary from "../Middleware/Cloudinary.js";
import Product from "../Models/ProductSchema.js";

const createproduct = async (req, res) => {
  try {
    const { pname, pdescription, pprice, pdiscount, ptype, psize, pcolor } = req.body;

    // ✅ Parse arrays safely (handles ["S","M","L"] or "S,M,L")
    const parseArray = (value) => {
      try {
        return typeof value === "string"
          ? JSON.parse(value)
          : Array.isArray(value)
          ? value
          : [];
      } catch {
        return value ? value.split(",").map((v) => v.trim()) : [];
      }
    };

    const sizes = parseArray(psize);
    const colors = parseArray(pcolor);

    // ✅ Upload all images to Cloudinary properly
    const uploadedImages = [];

    for (const file of req.files) {
      const base64File = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64File, {
        folder: "products",
      });
      uploadedImages.push(result.secure_url);
    }

    // ✅ Calculate discount price
    const discountPrice = pprice - (pprice * pdiscount) / 100;

    // ✅ Save product
    const newProduct = new Product({
      pname,
      pdescription,
      pprice,
      pdiscount,
      ptype,
      psize: sizes,
      pcolor: colors,
      pimage: uploadedImages,
      pdisprice: discountPrice,
    });

    await newProduct.save();

    return res.status(201).json({
      status: "success",
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("Product creation error:", err);
    return res.status(500).json({
      status: "fail",
      message: "something went wrong, try later",
    });
  }
};

const getallproduct = async(req,res) =>{

  try{

    console.log("hello world")

    const product = await Product.find();

    return res.status(200).json({
      status:"success",
      data:product
    })

  }catch(err){

    return res.status(500).json({
      status:"fail",
      message:"something went wrong try later"
    })
  }
}


const getsingleproduct = async(req,res) =>{

  try{

    console.log("hello world")

    const id = req.headers.id

    console.log(id)

    const product = await Product.findById(id);

    console.log(product)

    return res.status(200).json({
      status:"success",
      data:product
    })

  }catch(err){

    return res.status(500).json({
      status:"fail",
      message:"something went wrong try later"
    })
  }
}

export { createproduct,getallproduct,getsingleproduct};
