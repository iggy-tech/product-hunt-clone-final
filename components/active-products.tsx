import { auth } from "@/auth";
import ProductItem from "./product-item";

interface ActiveProductsProps {
  activeProducts: any;
}

const ActiveProducts: React.FC<ActiveProductsProps> = async ({
  activeProducts,
}) => {
  const authenticatedUser = await auth();

  const formattedActiveProducts = activeProducts?.map((product: any) => {
    const {
      id,
      name,
      slug,
      headline,
      description,
      logo,
      releaseDate,
      website,
      twitter,
      discord,
      createdAt,
      updatedAt,
      userId,
      status,
      images,
      categories,
      comments,
      upvotes
    } = product;



    const imageUrls = images.map((image: any) => image.url);
    const categoryNames = categories.map((category: any) => category.name);
    const commentsCount = comments ? comments.length : 0;

    const commentText = comments ? comments.map((comment: any) => ({
        id: comment.id,
        profile: comment.profilePicture,
        body : comment.body,
        user : comment.user.name,
        timestamp : comment.createdAt,
        userId : comment.user.id,
        name: comment.user.name.toLowerCase().replace(/\s/g, '_'),

    })) : [];


    const upvotesCount = upvotes ? upvotes.length : 0;
    const upvotesData = upvotes.map((upvote: any) => upvote.user.id)

    return {
      id,
      name,
      slug,
      headline,
      description,
      logo,
      releaseDate,
      website,
      twitter,
      discord,
      createdAt,
      updatedAt,
      userId,
      status,
      images: imageUrls,
      categories: categoryNames,
      commentsLength: commentsCount,
      commentData : commentText,
      upvoters: upvotesData,
      upvotes: upvotesCount,
    };
  });

  console.log(formattedActiveProducts, 'formattedActiveProducts')


  return (
    <div className="w-full">
      <div className="flex items-center border-b pb-3">
        <h1 className="text-xl font-medium">All Products</h1>
      </div>

      <div className="space-y-2 py-6 flex flex-col">
        {formattedActiveProducts?.map((product: any) => (
            <ProductItem 
            key={product.id}
            product={product}
            authenticatedUser={authenticatedUser}
            />
        ))}

      </div>
    </div>
  );
};

export default ActiveProducts;
