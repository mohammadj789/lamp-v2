export const fetchCollections = async (id) => {
  const response = await fetch(DOMAIN + "/collection/" + id, {
    next: { tags: ["collection"] },
    cache: "no-cache",
  });

  return response.json();
};
