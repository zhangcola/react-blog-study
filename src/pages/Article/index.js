import { Breadcrumb, Card, Form, Radio, Select, DatePicker, Button, Space , Tag, Table, Popconfirm} from "antd";
import FormItem from "antd/es/form/FormItem";
import locale from 'antd/es/date-picker/locale/zh_CN'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useEffect, useState } from "react";
import request from "@/utils";
import { useNavigate } from "react-router-dom";
import { useChannel } from "@/hooks/useChannel";
const { RangePicker } = DatePicker


const Article = () => {

  const navigate = useNavigate()
    
  const columns = [
    {
        title: '封面',
        dataIndex: 'cover',
        width: 120,
        render: cover => {
          return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        }
      },
      {
        title: '标题',
        dataIndex: 'title',
        width: 220
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: data => <Tag color="green">审核通过</Tag>
      },
      {
        title: '发布时间',
        dataIndex: 'pubdate'
      },
      {
        title: '阅读数',
        dataIndex: 'read_count'
      },
      {
        title: '评论数',
        dataIndex: 'comment_count'
      },
      {
        title: '点赞数',
        dataIndex: 'like_count'
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (text, data, index) => {
            return (
                <Space size="middle">
                    <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)}></Button>
                    <Popconfirm title="是否确认删除？" okText="删除" cancelText="取消" onConfirm={() => delArticle(data)}>
                        <Button type="primary" shape="circle" icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                    
                </Space>
            )
        }
      }
   ]

   //准备表格数据
//    const data = [
//         {
//             id: '8218',
//             comment_count: 0,
//             cover: {
//                 images: [],
//             },
//             like_count: 0,
//             pubdate: '2019-03-11 09:00:00',
//             read_count: 2,
//             status: 2,
//             title: 'wkwebview离线化加载h5资源解决方案'
//         }
//    ]
   const { channelList } = useChannel()


    const [articles, setArticles] = useState({
        list:[],
        count: 0
    })
    const [params, setParams] = useState({
        page: 1,
        per_page: 4,
        begin_pubdate: null,
        end_pubdate: null,
        status: null,
        channel_id: null
      })
    useEffect(() => {
        async function getArticles() {
            const res = await request.get('/mp/articles', {params})
            const {results, total_count} = res.data;
            setArticles({list: results, count: total_count})
        }
        getArticles()
    }, [params])

    const onSearchFinish = (formValues) =>{
        setParams({
            ...params,
            ...formValues,
            page: 1
        })
    }

    const delArticle = async(data) => {
        await request.delete(`/mp/articles/${data.id}`)
        setParams({
            page: 1,
            per_page: 10
        })
    }
    
  return (
    <div>
        <Card title = {
            <Breadcrumb items={
                [
                    {
                        title: '首页',
                        href: '/'
                    },
                    {
                        title: '文章列表'
                    }
                ]
            } />
        }>
        <Form initialValues={{status: ''}} onFinish={onSearchFinish}>
            <FormItem label="状态" name="status">
                <Radio.Group>
                    <Radio value="">全部</Radio>
                    <Radio value="0">草稿</Radio>
                    <Radio value="2">审核通过</Radio>
                </Radio.Group>
            </FormItem>
            <FormItem label="频道" name="channel_id">
                <Select 
                    placeholder="请选择频道"
                    defaultValue={'lucy'}
                    style={{width: '200px'}}
                >
                    {channelList.map(item => (
                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    ))}
                    
                </Select>
            </FormItem>
            <FormItem label="日期" name="date">
               <RangePicker  locale={locale}></RangePicker>
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">搜索</Button>
            </FormItem>
        </Form>
        </Card>
        <Card title={`根据筛选条件共查询到 ${articles.count} 条结果：`}>
           <Table columns={columns} dataSource={articles.list} rowKey="id" pagination={{
                current: params.page,
                pageSize: params.per_page,
                total: articles.count,
                onChange: (page, pageSize) => {
                    setParams({...params, page})
                }
            }} />
        </Card>
    </div>
  )
};
export default Article;