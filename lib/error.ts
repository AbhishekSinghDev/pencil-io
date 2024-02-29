export const handleApiError = (err: any) => {
  console.log(err);
  return new Response("something went wrong", { status: 500 });
};
