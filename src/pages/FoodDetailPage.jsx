"use client"

import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Card, Typography, Descriptions, Tag, Rate, Divider, Button, Spin, Image } from "antd"
import { ArrowLeftOutlined, EnvironmentOutlined, DollarOutlined } from "@ant-design/icons"
import { fetchFoodById } from "../store/slices/foodSlice"

const { Title, Text, Paragraph } = Typography

const FoodDetailPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { selectedFood, loading } = useSelector((state) => state.food)
    const { categories } = useSelector((state) => state.categories)
    const { districts } = useSelector((state) => state.districts)

    useEffect(() => {
        dispatch(fetchFoodById(id))
    }, [dispatch, id])

    const handleBack = () => {
        navigate(-1)
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
    }

    if (loading || !selectedFood) {
        return (
            <div style={{ textAlign: "center", padding: "100px" }}>
                <Spin size="large" />
            </div>
        )
    }

    const category = categories.find((c) => c.id === selectedFood.categoryId)
    const district = districts.find((d) => d.id === selectedFood.district)

    return (
        <div className="food-detail-page">
            <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleBack} style={{ marginBottom: 16 }}>
                Quay Lại Danh Sách
            </Button>

            <Card>
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={10}>
                        <Image
                            src={selectedFood.imageUrl || "/placeholder.svg"}
                            alt={selectedFood.name}
                            style={{ width: "100%", borderRadius: 8 }}
                        />
                    </Col>

                    <Col xs={24} md={14}>
                        <Title level={2}>{selectedFood.name}</Title>

                        <div style={{ marginBottom: 16 }}>
                            <Rate disabled defaultValue={selectedFood.popularity} allowHalf />
                            <Text style={{ marginLeft: 8 }}>{selectedFood.popularity} / 5</Text>
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <Tag color="blue">{district?.name || "Quận không xác định"}</Tag>
                            <Tag color="green">{category?.name || "Chưa phân loại"}</Tag>
                            <Tag color={selectedFood.foodType === "wet" ? "cyan" : selectedFood.foodType === "dry" ? "orange" : "purple"}>
                                {selectedFood.foodType === "wet" ? "Món Nước" : selectedFood.foodType === "dry" ? "Món Khô" : "Cả nước cả khô"}
                            </Tag>

                            <Tag color="purple">{selectedFood.country}</Tag>
                        </div>

                        <Paragraph>{selectedFood.description}</Paragraph>

                        <Divider />

                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Giá">
                                <Text strong style={{ color: "#ff4d4f" }}>
                                    <DollarOutlined /> {formatPrice(selectedFood.price)}
                                </Text>
                            </Descriptions.Item>

                            <Descriptions.Item label="Địa Chỉ">
                                <EnvironmentOutlined /> {selectedFood.address}
                            </Descriptions.Item>

                            <Descriptions.Item label="Xuất Xứ">
                                {selectedFood.country === "Vietnam" ? "Việt Nam" : selectedFood.country}
                            </Descriptions.Item>

                            <Descriptions.Item label="Danh Mục">{category?.name || "Chưa phân loại"}</Descriptions.Item>

                            <Descriptions.Item label="Loại Món Ăn">
                                {selectedFood.isLiquid ? "Món Nước" : "Món Khô"}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default FoodDetailPage

