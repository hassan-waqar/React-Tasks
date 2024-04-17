import React from 'react';
import { connect } from 'react-redux'


const imgStyle = {
    hight: 'auto',
    width: '80%',
    border: '4px solid RebeccaPurple ',
    borderRadius: '5%'
};
const articleStyle = {
    width: '50%',
    margin: '0 auto',
    color: 'olive'
}
let NewsItem = ({ title, body }) => (
    title ?
        <article style={articleStyle} >
            <div>
                <h1>{title}</h1>
                <h4>{body}</h4>
            </div>
        </article> :
        null
);
const mapStateToProps = (state) => ({
    title: state.title,
    body : state.body
})

NewsItem = connect(mapStateToProps,null)(NewsItem)
export default NewsItem;