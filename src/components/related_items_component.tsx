
interface RelatedItem {
    id: number;
    title: string;
    price: string;
    imageUrl: string;
}

interface RelatedItemsComponentProps {
    items: RelatedItem[];
}

export function RelatedItemsComponent({ items }: RelatedItemsComponentProps) {
    return (
        <section className="py-5 bg-light">
            <div className="container px-4 px-lg-5 mt-5">
                <h2 className="fw-bolder mb-4">Related products</h2>
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {items.map(item => (
                        <div className="col mb-5" key={item.id}>
                            <div className="card h-100">
                                <img className="card-img-top" src={item.imageUrl} alt={item.title} />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">{item.title}</h5>
                                        {item.price}
                                    </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}