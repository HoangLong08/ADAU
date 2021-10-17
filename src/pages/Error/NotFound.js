import React from 'react'
import { Result, Button } from 'antd'
import { Link, Redirect } from 'react-router-dom'
function NotFound() {
  const infoAdmin = JSON.parse(localStorage.getItem("infoAdmin"));
  if (!infoAdmin) {
    return <Redirect to="/" />
  }
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn truy cập không tồn tại"
        extra={<Link to="/manage-bashboard"><Button type="primary">Trang chủ</Button></Link>}
      />
    </>
  )
}

export default NotFound

