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

  const usersData: Partial<Users>[] = [
    {
      fullName: "Admin",
      username: "admin",
      email: "admin@example.com",
      password: "admin5432",
      roleId: adminRole.id,
    },
    {
      fullName: "John Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      password: "johndoe123",
      roleId: userRole.id,
    },
  ];

  const createdUsers = [];
  for (const user of usersData) {
    const hashedPassword = await bcrypt.hash(user.password || "", 10);
    const createdUser = await prisma.users.create({
      data: {
        email: user.email || "",
        password: hashedPassword,
        roleId: user.roleId,
        username: user.username || "",
        fullName: user.fullName || "",
      },
    });
    createdUsers.push(createdUser);
    console.log(`Seeding user: ${user.username} (email: ${user.email})`);
  }

  const menusData: Partial<Menu>[] = [
    {
      name: "Burger",
      price: 25_000,
      category: Categories.food,
      description: "Burger daging sapi lezat dengan keju dan sayuran segar.",
      status: true,
      stock: 10,
      imageUrl:
        "https://img.pikbest.com/photo/20240708/burger-hd-photo-with-black-table-_10658059.jpg!w700wp",
    },
    {
      name: "Americano",
      price: 18_000,
      category: Categories.beverages,
      description: "Kopi hitam klasik yang nikmat.",
      status: true,
      stock: 10,
      imageUrl:
        "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//98/MTA-54187613/freshly_baked_by_origin_bakery_americano_full02_kd07blpv.jpg",
    },
    {
      name: "Pizza Margherita",
      price: 50_000,
      category: Categories.food,
      description:
        "Pizza Margherita dengan saus tomat, keju mozzarella, dan basil segar.",
      status: true,
      stock: 10,
      imageUrl:
        "https://assets.surlatable.com/m/15a89c2d9c6c1345/72_dpi_webp-REC-283110_Pizza.jpg",
    },
    {
      name: "Iced Latte",
      price: 22_000,
      category: Categories.beverages,
      description: "Kopi latte dingin dengan es batu yang menyegarkan.",
      status: true,
      stock: 10,
      imageUrl:
        "https://www.nescafe.com/id/sites/default/files/2023-04/RecipeHero_IcedCaramelLatte_1066x1066.jpg",
    },
    {
      name: "Spaghetti Carbonara",
      price: 40_000,
      category: Categories.food,
      description: "Spaghetti dengan saus carbonara, bacon, dan keju parmesan.",
      status: true,
      stock: 10,
      imageUrl:
        "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0346a29a89ef229b1a0ff9697184f944/Derivates/cb5051204f4a4525c8b013c16418ae2904e737b7.jpg",
    },
  ];

  for (const menu of menusData) {
    await prisma.menu.create({
      data: {
        name: menu.name || "",
        price: menu.price || 0,
        category: menu.category || "food",
        description: menu.description || "",
        status: menu.status,
        stock: menu.stock || 0,
        imageUrl: menu.imageUrl || "",
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
