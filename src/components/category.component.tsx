import Image from "next/image";

async function fetchData() {
    try {
        const response = await fetch('http://localhost:8000/api/event/categories', {
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
        <section className="w-full p-6">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center min-[700px]:text-left">Category</h1>
            <div className="hidden min-[700px]:block w-26 h-2 bg-[#0D2B50] rounded-full min-[700px]:ml-0 mx-auto"></div>
            <div className="overflow-x-auto">
                <div className="flex gap-4 px-4 py-2 w-max">
                    {categories.map((category: ICategory, index: number) => (
                        <div
                            key={index}
                            className="flex flex-col items-center min-w-[60px] text-center m-8 max-[500px]:m-1"
                        >
                            <Image
                                src={category.path}
                                alt={category.category}
                                width={40}
                                height={40}
                                className="custom-size object-cover flex items-center justify-center w-30 h-30 rounded-full"
                            />
                            <span className="text-sm">{category.category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryChips
