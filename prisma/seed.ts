import { Categories, Menu, PrismaClient, Role, Users } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminRole: Role = await prisma.role.create({
    data: { name: "admin" },
  });

  const userRole: Role = await prisma.role.create({
    data: { name: "user" },
  });

  const usersData: Users[] = [
    {
      id: 1,
      fullName: "Admin",
      username: "admin",
      email: "admin@example.com",
      password: "admin5432",
      roleId: adminRole.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 2,
      fullName: "John Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      password: "johndoe123",
      roleId: userRole.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  const createdUsers = [];
  for (const user of usersData) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await prisma.users.create({
      data: {
        id: user.id,
        email: user.email,
        password: hashedPassword,
        roleId: user.roleId,
        username: user.username,
        fullName: user.fullName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      },
    });
    createdUsers.push(createdUser);
    console.log(`Seeding user: ${user.username} (email: ${user.email})`);
  }

  const menusData: Menu[] = [
    {
      id: 1,
      name: "Burger",
      price: 25_000,
      category: Categories.food,
      description: "Burger daging sapi lezat dengan keju dan sayuran segar.",
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      imageUrl:
        "https://img.pikbest.com/photo/20240708/burger-hd-photo-with-black-table-_10658059.jpg!w700wp",
    },
    {
      id: 2,
      name: "Americano",
      price: 18_000,
      category: Categories.beverages,
      description: "Kopi hitam klasik yang nikmat.",
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      imageUrl:
        "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//98/MTA-54187613/freshly_baked_by_origin_bakery_americano_full02_kd07blpv.jpg",
    },
    {
      id: 3,
      name: "Pizza Margherita",
      price: 50_000,
      category: Categories.food,
      description:
        "Pizza Margherita dengan saus tomat, keju mozzarella, dan basil segar.",
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      imageUrl:
        "https://assets.surlatable.com/m/15a89c2d9c6c1345/72_dpi_webp-REC-283110_Pizza.jpg",
    },
    {
      id: 4,
      name: "Iced Latte",
      price: 22_000,
      category: Categories.beverages,
      description: "Kopi latte dingin dengan es batu yang menyegarkan.",
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      imageUrl:
        "https://www.nescafe.com/id/sites/default/files/2023-04/RecipeHero_IcedCaramelLatte_1066x1066.jpg",
    },
    {
      id: 5,
      name: "Spaghetti Carbonara",
      price: 40_000,
      category: Categories.food,
      description: "Spaghetti dengan saus carbonara, bacon, dan keju parmesan.",
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      imageUrl:
        "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0346a29a89ef229b1a0ff9697184f944/Derivates/cb5051204f4a4525c8b013c16418ae2904e737b7.jpg",
    },
  ];

  for (const menu of menusData) {
    await prisma.menu.create({
      data: {
        name: menu.name,
        price: menu.price,
        category: menu.category,
        description: menu.description,
        status: menu.status,
        imageUrl: menu.imageUrl,
      },
    });
    console.log(`Seeding menu: ${menu.name}`);
  }

  console.log("Seeding completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
