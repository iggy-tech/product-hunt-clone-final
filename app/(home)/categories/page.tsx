import { getCategories } from "@/lib/server-actions";
import Link from "next/link";

const Categories = async () => {
  const categories = await getCategories();

  return (
    <div className="xl:w-3/5 w-4/5 pt-6 md:py-10 mx-auto px-6 md:px-0">
      <div className="bg-gray-100 rounded-md w-full p-10 ">
        <h1 className="text-4xl font-semibold">Categories</h1>
        <p className="text-gray-500 pt-2">
          Discover new products in different categories and find what you need
          to make your life easier
        </p>
      </div>

      <div>
        <div className="pt-10 grid grid-cols-2 gap-6">
          {categories.map((category: any) => (
            <Link
              href={`/category/${category.name.toLowerCase()}`}
              key={category.id}
              className="space-x-10 p-5 rounded-xl
                 shadow-md bg-orange-100
                  hover:scale-105
                  hover:cursor-pointer
                  transition-transform
                    duration-300
                    ease-in-out
                  
                  "
            >
              <div className="md:flex justify-between">
                <h2 className="md:text-2xl font-semibold">{category.name}</h2>
                <p className="hover:underline cursor-pointer text-sm">
                  View all products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
