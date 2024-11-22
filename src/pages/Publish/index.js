import { Breadcrumb, Button, Card, Form, Input, Radio, Select, Upload } from "antd"
import FormItem from "antd/es/form/FormItem"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { PlusOutlined} from "@ant-design/icons"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { useChannel } from "@/hooks/useChannel"
import { getArticleById } from "@/apis/article"

const Publish = () => {

    const [searchParams] = useSearchParams()
    const articleId = searchParams.get("id")
    const [form] = Form.useForm()


    const onFinish = (values) => {
        console.log(values)
    }

    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        setImageType(e.target.value)
    }

    const [imageList, setImageList] = useState([])
    const onUploadChange = (info) => {
        setImageList(info.fileList)
    }

    const { channelList } = useChannel()

    useEffect(() => {
        async function getArticle() {
            // 根据文章id获取文章详情
            const res = await getArticleById(articleId)
            // 将数据设置到表单中
            const data = res.data
            const {cover} = data
            form.setFieldsValue({
                ...data,
                type: data.cover.type
            })
            setImageList(cover.images.map(url => ({url})))
            setImageType(cover.type)
        }
        if (articleId) {
            getArticle()
        }
    }, [articleId, form])

    return (
        <div className = "publish">
            <Card title={<Breadcrumb items={[
                {title: <Link to={"/"}>首页</Link>}, 
                {title: articleId ? '编辑文章' : '发布文章'}]
                }> </Breadcrumb>}>

                <Form
                    labelCol={{span:4}}
                    wrapperCol={{span:16}}
                    initialValues={{type: 0}}
                    onFinish={onFinish}
                    form = {form}
                >
                    <FormItem label="标题" name="title" rules={[{required: true, message: '请输入文章标题'}]}>
                        <Input type="text" placeholder="请输入文章标题" style={{width: '300px'}}/>
                    </FormItem>

                    <FormItem label="频道" name="channel_id" rules={[{required: true, message: '请选择频道'}]}>
                        <Select placeholder="请选择频道" style={{width: '300px'}}>
                            {channelList.map(item => (
                                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </FormItem>

                    <FormItem label="封面">
                        <FormItem name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </FormItem>
                        
                        {/* 根据imageType显示是否需要上传组件 */}
                        {imageType > 0 && 
                            <Upload action={'http://geek.itheima.net/v1_0/upload'} listType="picture-card" name="image"
                            maxCount={imageType}
                            fileList={imageList} 
                            showUploadList 
                            onChange={onUploadChange}
                            >
                            <div style={{marginTop: '10px'}}>
                                <PlusOutlined />
                            </div>
                            </Upload>
                        }
                    </FormItem>

                    <FormItem label="内容" name="content" rules={[{required: true, message: '请输入文章内容'}]}>
                        <ReactQuill theme="snow" className="publish-quill" placeholder="请输入文章内容"/>
                    </FormItem>

                    <FormItem wrapperCol={{offset:4}}>
                        <Button type="primary" htmlType="submit">发布文章</Button>
                    </FormItem>
                </Form>
            </Card> 
        </div>
    )
}

export default Publish