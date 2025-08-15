import Cards from "@/components/cards";

export default async function Home() {
  return (
    <>
      {/* Page Content */}
      <main className="pt-[88px] min-h-screen py-8 px-4">
        <div className="relative z-10 max-w-full mx-auto">
          {/* <BioCard /> */}
          <Cards />
        </div>
      </main>
    </>
  );
}
