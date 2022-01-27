import React, { useState } from 'react';
import axios from 'axios';
import DeleteArticle from './DeleteArticle';

const Article = ({article}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditContent] = useState("");

    const DateParser = (date) => {
        return (
            new Date(date).toLocaleDateString('en-EN', {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            })
        )
    }

    const handleEdit = () => {

        const data = {
            author: article.author,
            content: editedContent ? editedContent : article.content,
            date: editedContent ? Date.now() : article.date
        };

        axios.put("http://localhost:3003/articles/" + article.id, data)

        setIsEditing(false);
    }

    return (
        <div className='article' style={{background: isEditing ? "#f3feff": "white"}}>
            <div className='card-header'>
                <h3>{article.author}</h3>
                <em>Last modification on {editedContent ? DateParser(Date.now()) : DateParser(article.date)}</em>
            </div>
            {isEditing ? (
                <textarea onChange={(e) => setEditContent(e.target.value)} 
                    autoFocus 
                    defaultValue={editedContent ? editedContent : article.content} 
                ></textarea>
            ) : (
                <p>{editedContent ? editedContent : article.content}</p>
            )}
            

            <div className='btn-container'>
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                ) : (
                    <button onClick={handleEdit}>Save</button>
                )}
                {!isEditing ? (
                    <DeleteArticle id={article.id} />
                ) : (
                    <button onClick={() => {
                        setIsEditing(false); 
                        setEditContent("")
                    }}>Cancel</button>
                )}
                
            </div>
        </div>
    );
};

export default Article;