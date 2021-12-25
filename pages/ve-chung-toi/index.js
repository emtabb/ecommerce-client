import AboutUsContent from "../../components/content/AboutUs";
import React, {useEffect, useState} from "react";
import axios from "axios";
import constants from "../../components/constants";
import AbstractPageFacade from "../../facade/AbstractPageFacade";
import Head from "next/head";
import Navbar from "../../components/Header/Navbar";
import {Card, Container} from "react-bootstrap";
import Footer from "../../components/Footer";

function AboutUsDetails() {
  return (
      <div>
          Càfê RuNam có các công thức pha trộn khác nhau – tuỳ thuộc vào tỉ lệ tương ứng giữa hạt Arabica, Robusta và cách rang, xay để tạo nên sự đa dạng trong phong cách và mùi vị Cà phê Việt. Tất cả các loại Càfê RuNam đều được đóng gói 250 gr để thuận tiện cho khách hàng trong việc sử dụng hoặc làm quà tặng. Giá trị của từng gói Càfê RuNam không chỉ gói gọn trong chất lượng mà còn được bộc lộ qua ý tưởng thể hiện văn hoá uống Cà phê Việt trên bao bì được tạo nên bởi hoạ sĩ Nguyễn Thành Phong và Sandrine Llouquet.
      </div>
  )
}

export default function AboutUsPage({loadspace, category, API, DEFAULT_COLOR, FOOTER_CONTACT, FOOTER_ADDRESS}) {
  const api = API;
  const {ACTION_GET_CART} = constants;
  const [productsCart, setProductsCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleCartData = (data) => {
      setProductsCart(data);
      setLoading(true);
  }
  useEffect(() => {
      let payload = {
          action: ACTION_GET_CART
      }

      //handleCartData(cartRequest(payload));
      setLoading(true);
      return () => {
          setProductsCart([]);
          setLoading(false);
      }
  }, []);

  return (
      <div>
          <Head>
              <title>GNIKE COFFEE: giao tận nơi, thơm trọn từng giây.</title>
              <meta name="title" content="GNIKE COFFEE: giao tận nơi, thơm trọn từng giây."/>
              <meta name="image" content="https://gnikee.com/background-store.jpg"/>
              <meta name="description" content="Thương hiệu cà phê Việt, giao hàng tận nơi."/>
              <meta property="og:url" content="https://gnikee.com"/>
              <meta property="fb:app_id" content="1132734720507826"/>
              <meta property="og:type" content="article"/>
              <meta property="article:publisher" content="https://facebook.com/cafebinhthanh"/>
              <meta property="og:title" content="GNIKE COFFEE: giao tận nơi, thơm trọn từng giây."/>
              <meta property="og:site_name" content="GNIKE COFFEE: Cà phê Việt"/>
              <meta property="og:description" content="Thương hiệu cà phê Việt, giao hàng tận nơi."/>
              <meta property="og:image" content="https://gnikee.com/background-store.jpg"/>
              <meta property="og:image:type" content="image/jpeg"/>
              <meta property="og:image:width" content="1280"/>
              <meta property="og:image:height" content="840"/>
              <meta property="og:image:alt" content=""/>
          </Head>
          <div>
              {loading
                  ? (<Navbar DEFAULT_COLOR={DEFAULT_COLOR} currentProductInCart={productsCart.length}/>)
                  : (<Navbar DEFAULT_COLOR={DEFAULT_COLOR} currentProductInCart={0}/>)
              }
              <Container fluid className="p-0">
                  {/* {loadspace.space.length !== 0 ? (
                          <AboutUsContent category={category} api={api} products={loadspace.space}
                                               setProductsCart={handleCartData}
                                               DEFAULT_COLOR={DEFAULT_COLOR}
                          />
                      ) :
                      (<div className="row">
                          <div className="col-xs-12 col-12 col-md-8">
                              <Card className=" p-3" style={{minHeight: '18rem'}}>
                                  <p>Không có sản phẩm</p>
                              </Card>
                          </div>
                      </div>)
                  } */}
                  <AboutUsContent></AboutUsContent>
              </Container>
              <Footer DEFAULT_COLOR={DEFAULT_COLOR}
                      FOOTER_CONTACT={FOOTER_CONTACT}
                      FOOTER_ADDRESS={FOOTER_ADDRESS}
              />
          </div>
      </div>
  )
}

export async function getServerSideProps() {
  const serverData = AbstractPageFacade.initialEnvProperties();
  const response = await axios.get(`${serverData.API}/api/loadspace/product?space=${serverData.SPACE_NAME}&pageable=release_date,-1,1,1000`);
  const categoryResponse = await axios.get(`${serverData.API.concat(serverData.CATEGORY_REQUEST)}`);
  serverData.loadspace = response.data;
  serverData.category = categoryResponse.data.space;

  return {
      props: serverData
  }
}