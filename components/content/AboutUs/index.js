import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'

import React from 'react';
import styled from 'styled-components';
import { Col, Figure, Row } from 'react-bootstrap';

const ThemedJumbotron = styled(Jumbotron)`
  background-image: url("https://caferunam.com/wp-content/uploads/2019/08/banner-location-1-1.jpg");
  margin-bottom: 0;
`;

const TitlePage = styled.h2`
  color: #be9128;
  display: flex;
  justify-content: center;
  
`;

const AboutUsContent = styled.div`
  background-color: #44352a;
  display: flex;
  justify-content: center;
`;

const colorText = '#fff0d7';

const AboutUs = () => {

  return (
    <>
      <ThemedJumbotron fluid>
        <Container>
          <TitlePage>VỀ CHÚNG TÔI</TitlePage>
          <p>
            This is a modified fluid jumbotron which
            stretches the whole horizontal space.	
          </p>
        </Container>
      </ThemedJumbotron>
      <AboutUsContent>
        <Container>
          <Row md={12}>
            <Col>
              <h3 style={{textAlign: 'center'}}><strong style={{color: colorText}}><span>S-PREMIUM COFFEE</span></strong></h3>
            </Col>
          </Row>
          <Row md={12}>
            <Col>
              <h4 style={{color: colorText, textDecoration: 'bold'}}>Lịch sử hình thành:</h4>
              <p style={{color: colorText}}>RuNam – Một thương hiệu với nguồn cảm hứng bất tận từ lời Ru của nước Nam, mang trong mình sự lãng mạn sâu lắng và tinh thần truyền thống của đất Việt. Chúng tôi luôn hướng đến những sản phẩm truyền thống và mong muốn mang những sản phẩm đó với một chất lượng hoàn hảo nhất dựa vào các khâu tuyển chọn sát sao đến cho khách hàng trong và ngoài nước. Và Cà phê chính là một sản phẩm đặc trưng của đất Việt – là cái nôi bắt đầu cho ý tưởng của thương hiệu RuNam.</p>
            </Col>
            <Col>
              <Figure style={{height: '80%', width: '80%'}}>
                <Figure.Image
                  width="100%"
                  height="100%"
                  src="https://caferunam.com/wp-content/uploads/2019/09/Untitled-2-1-400x200.jpg"
                />
              </Figure>
            </Col>
          </Row>
          <Row>
            <Col>
              <Figure style={{height: '80%', width: '80%'}}>
                <Figure.Image
                  width="100%"
                  height="100%"
                  src="https://caferunam.com/wp-content/uploads/2019/09/Untitled-2-1-400x200.jpg"
                />
              </Figure>
            </Col>
            <Col>
              <h4 style={{color: colorText}}>Sứ mệnh:</h4>
              <p style={{color: colorText}}>Bằng niềm đam mê và tâm huyết với hạt Cà phê Việt Nam, Càfê RuNam áp dụng công nghệ rang xay độc quyền để dung hợp tạo nên những sản phẩm chất lượng nhất đến với khách hàng. Bên cạnh đó, RuNam chú trọng về khẩu vị và thói quen uống Cà phê của người Việt trong quá trình nghiên cứu tỉ lệ hạt trong các sản phẩm nhằm tạo nên những gói Cà phê chiều lòng cả những vị khách khó tính nhất. Tìm đến Càfê RuNam, khách hàng sẽ luôn nhận được sự tận tâm, chất lượng đồng đều và hương vị độc đáo.</p>
            </Col>
          </Row>

        </Container>
      </AboutUsContent>
    </>
  )

};

export default AboutUs;