"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Card, Typography, Select, Button, Divider, Spin, Rate, Tag, Space } from "antd"
import { Link } from "react-router-dom"
import { fetchFoodPlaces, setFilters, clearFilters } from "../store/slices/foodSlice"
import { fetchCategories } from "../store/slices/categorySlice"
import { fetchDistricts } from "../store/slices/districtSlice"

const { Title, Text } = Typography
const { Option } = Select
const { Meta } = Card

const HomePage = () => {
    const dispatch = useDispatch()
    const { filteredFoodPlaces, loading } = useSelector((state) => state.food)
    const { categories } = useSelector((state) => state.categories)
    const { districts } = useSelector((state) => state.districts)
    const [countries, setCountries] = useState([])

    useEffect(() => {
        dispatch(fetchFoodPlaces())
        dispatch(fetchCategories())
        dispatch(fetchDistricts())
    }, [dispatch])

    useEffect(() => {
        if (filteredFoodPlaces.length > 0) {
            const uniqueCountries = [...new Set(filteredFoodPlaces.map((food) => food.country))]
            setCountries(uniqueCountries)
        }
    }, [filteredFoodPlaces])

    const handleFilterChange = (filterType, value) => {
        dispatch(setFilters({ [filterType]: value }))
    }

    const handleClearFilters = () => {
        dispatch(clearFilters())
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
    }

    return (
        <div className="home-page">
            <Divider orientation="left">Bộ lọc</Divider>

            <Row gutter={[16, 16]} className="filter-row">
                <Col xs={24} sm={12} md={6} lg={4}>
                    <Select
                        placeholder="Chọn Quận"
                        style={{ width: "100%" }}
                        allowClear
                        onChange={(value) => handleFilterChange("district", value)}
                    >
                        {districts.map((district) => (
                            <Option key={district.id} value={district.id}>
                                {district.name}
                            </Option>
                        ))}
                    </Select>
                </Col>

                <Col xs={24} sm={12} md={6} lg={4}>
                    <Select
                        placeholder="Loại Món Ăn"
                        style={{ width: "100%" }}
                        allowClear
                        onChange={(value) => handleFilterChange("isLiquid", value)}
                    >
                        <Option value={true}>Món Nước</Option>
                        <Option value={false}>Món Khô</Option>
                    </Select>
                </Col>

                <Col xs={24} sm={12} md={6} lg={4}>
                    <Select
                        placeholder="Xuất Xứ"
                        style={{ width: "100%" }}
                        allowClear
                        onChange={(value) => handleFilterChange("country", value)}
                    >
                        {countries.map((country) => (
                            <Option key={country} value={country}>
                                {country === "Vietnam" ? "Việt Nam" : country}
                            </Option>
                        ))}
                    </Select>
                </Col>

                <Col xs={24} sm={12} md={6} lg={4}>
                    <Select
                        placeholder="Danh Mục"
                        style={{ width: "100%" }}
                        allowClear
                        onChange={(value) => handleFilterChange("categoryId", value)}
                    >
                        {categories.map((category) => (
                            <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Col>

                <Col xs={24} sm={12} md={6} lg={4}>
                    <Button type="primary" onClick={handleClearFilters}>
                        Xóa Bộ Lọc
                    </Button>
                </Col>
            </Row>

            <Divider orientation="left">Địa Điểm Ăn Uống</Divider>

            {loading ? (
                <div style={{ textAlign: "center", padding: "50px" }}>
                    <Spin size="large" />
                </div>
            ) : (
                <Row gutter={[16, 16]}>
                    {filteredFoodPlaces.map((food) => {
                        const category = categories.find((c) => c.id === food.categoryId)
                        const district = districts.find((d) => d.id === food.district)

                        return (
                            <Col xs={24} sm={12} md={8} lg={6} key={food.id}>
                                <Link to={`/food/${food.id}`}>
                                    <Card
                                        hoverable
                                        cover={
                                            <img
                                                alt={food.name}
                                                src={food.imageUrl || "/placeholder.svg"}
                                                style={{ height: 200, objectFit: "cover" }}
                                            />
                                        }
                                        actions={[
                                            <Rate key="1" disabled defaultValue={food.popularity} allowHalf />,
                                            <Text key="2" strong>
                                                {formatPrice(food.price)}
                                            </Text>,
                                        ]}
                                    >
                                        <Meta
                                            title={food.name}
                                            description={
                                                <Space direction="vertical">
                                                    <Text type="secondary" ellipsis={{ rows: 2 }}>
                                                        {food.description}
                                                    </Text>
                                                    <Space>
                                                        {district && <Tag color="blue">{district.name}</Tag>}
                                                        {category && <Tag color="green">{category.name}</Tag>}
                                                        <Tag color={food.foodType === "wet" ? "cyan" : food.foodType === "dry" ? "orange" : "purple"}>
                                                            {food.foodType === "wet" ? "Món Nước" : food.foodType === "dry" ? "Món Khô" : "Cả nước cả khô"}
                                                        </Tag>

                                                        <Tag color="purple">{food.country}</Tag>
                                                    </Space>
                                                </Space>
                                            }
                                        />
                                    </Card>
                                </Link>
                            </Col>
                        )
                    })}

                    {filteredFoodPlaces.length === 0 && (
                        <Col span={24}>
                            <div style={{ textAlign: "center", padding: "50px" }}>
                                <Text type="secondary">Không tìm thấy địa điểm ăn uống phù hợp với bộ lọc của bạn.</Text>
                            </div>
                        </Col>
                    )}
                </Row>
            )}
        </div>
    )
}

export default HomePage

