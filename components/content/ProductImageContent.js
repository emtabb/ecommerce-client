import React from 'react';

class ProductContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: props.star_space.label,
            event: props.star_space.event,
            category: props.category,
            space_name: props.space_name,
            request_url: props.star_space.request_url,
            url: "",
            scrolling: false,
            space: [],
            observer_space: []
        }
        this.handleScrollLoadSpace = this.handleScrollLoadSpace.bind(this)
    }

    async onInfiniteScroll() {
        window.addEventListener('scroll', async () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (clientHeight + scrollTop >= scrollHeight - 2) {

                if (this.state.scrolling) {
                    return;
                }
                this.setState({ scrolling: true });
                setTimeout(() => {
                    this.handleScrollLoadSpace();
                }, 300);

            }
        });
    }

    async handleScrollLoadSpace() {
        if (this.state.next !== undefined) {
            let url = `/api/loadspace/${this.state.next}`
            let response = await axios.get(url);
            await this.setState({
                observer_space: [...this.state.observer_space, ...await response.data.space],
                next: await response.data.next,
                scrolling: false
            });
        }
    }

    async componentDidMount() {
        console.log(this.state.category);
        await this.setState({ url: `/api/loadspace/${this.state.event}?space=${this.state.space_name}&category=${this.state.category.toUpperCase()}${this.state.request_url}` });
        let response = await axios.get(this.state.url + `,1,6`);
        this.setState({
            space: await response.data.space,
            next: await response.data.next
        });

        await this.onInfiniteScroll();
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-shopping">
                    <thead>
                        <tr>
                            <th className="text-center"></th>
                            <th>Product</th>
                            <th className="th-description">Color</th>
                            <th className="th-description">Size</th>
                            <th className="text-right">Price</th>
                            <th className="text-right">Qty</th>
                            <th className="text-right">Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <ProductCard></ProductCard>
                    </tbody>
                </table>
            </div>
        )
    }
}

function ProductCard(props) {
    let borderRadius = "0.7rem"
    let cardSubStyleSheet = {
        borderRadius: borderRadius,
        hover: ""
    }

    let cardImageSubStyleSheet = {
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius
    }
    let product = props.product;
    let label = props.label;
    return (
        <tr>
            <td>
                <div className="img-container">
                    <img src="https://images.thenorthface.com/is/image/TheNorthFace/NF0A2VFL_619_hero" rel="nofollow" alt="..." />
                </div>
            </td>
            <td className="td-name">
                <a href="#jacket">Spring Jacket</a>
                <br /><small>by Dolce&amp;Gabbana</small>
            </td>
            <td>
                Red
              </td>
            <td>
                M
              </td>
            <td className="td-number">
                <small>&#x20AC;</small>549
              </td>
            <td className="td-number">
                1
                  <div className="btn-group">
                    <button className="btn btn-round btn-info btn-sm"> <i className="material-icons">remove</i> </button>
                    <button className="btn btn-round btn-info btn-sm"> <i className="material-icons">add</i> </button>
                </div>
            </td>
            <td className="td-number">
                <small>&#x20AC;</small>549
              </td>
            <td className="td-actions">
                <button type="button" rel="tooltip" data-placement="left" title="Remove item" className="btn btn-simple">
                    <i className="material-icons">close</i>
                </button>
            </td>
        </tr>
    )
}

export default ProductContent;