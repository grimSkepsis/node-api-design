import prisma from "../db";

export const getProducts = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        products: true,
      },
    });
    res.json({ data: user.products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id,
        belongsToId: req.user.id,
      },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        belongsToId: req.user.id,
      },
    });
    res.status(201).json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const product = await prisma.product.update({
      where: {
        id,
        belongsToId: req.user.id,
      },
      data: {
        name,
      },
    });
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: {
        id,
        belongsToId: req.user.id,
      },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
