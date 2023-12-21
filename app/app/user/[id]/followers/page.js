import { DOMAIN } from "@/utils/constant";
import Card from "../profile/Card";

const page = async ({ params }) => {
  const response = await fetch(
    DOMAIN + "/user/followers/" + params.id,
    {
      cache: "no-cache",
    }
  );
  const data = await response.json();

  console.log(data);

  return (
    <main className="w-full text-white px-3 flex flex-col gap-3 pt-16">
      <div>
        <h3>followers</h3>
      </div>
      <div className="grid grid-cols-6 sm:grid-cols-2">
        {data?.followers.map((item) => (
          <Card
            type={item.role.toLowerCase()}
            withoutBtn
            key={item._id}
            item={{
              _id: item._id,
              image: item.image,
              title: item.name,
            }}
          />
        ))}
      </div>
    </main>
  );
};

export default page;
