import prisma from "../db";

export const getUpdates = async (req, res) => {
  const updates = await prisma.update.findMany({
    where: {
      product: {
        belongsToId: req.user.id,
      },
    },
  });
  res.json({ data: updates });
};

export const getUpdateById = async (req, res) => {
  const { id } = req.params;
  const update = await prisma.update.findUnique({
    where: {
      id,
      product: {
        belongsToId: req.user.id,
      },
    },
  });
  if (!update) {
    return res.status(404).json({ message: "Update not found" });
  }
  res.json({ data: update });
};

export const createUpdate = async (req, res) => {
  const { title, body, productId } = req.body;
  const update = await prisma.update.create({
    data: {
      title,
      body,
      product: {
        connect: {
          id: productId,
          belongsToId: req.user.id,
        },
      },
    },
  });
  res.status(201).json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const update = await prisma.update.update({
    where: {
      id,
      product: {
        belongsToId: req.user.id,
      },
    },
    data: {
      title,
      body,
    },
  });
  res.json({ data: update });
};

export const deleteUpdate = async (req, res) => {
  const { id } = req.params;
  await prisma.update.delete({
    where: {
      id,
      product: {
        belongsToId: req.user.id,
      },
    },
  });
  res.status(204).end();
};
