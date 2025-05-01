import Image from "next/image";

async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/api/event/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data?.data;

    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}

const CategoryChips = async () => {
    const categories = await fetchData()
    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-6">
            <div className="text-center  mx-auto">
                <h1 className="text-5xl font-bold mb-12">Category</h1>

                <div className="flex flex-wrap justify-center ">
                    {categories.map((category: ICategory, index: number) => (

                        <button
                            key={index}
                            className="flex flex-col items-center justify-center m-8"
                        >
                            <Image
                                src={category.path}
                                alt={category.category}
                                className="object-cover flex items-center justify-center w-32 h-32 sm:w-30 sm:h-30 md:w-30 md:h-30 rounded-full"
                                width={100}
                                height={100}
                            />
                            <span className="font-medium text-center py-6">
                                {category?.category}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryChips