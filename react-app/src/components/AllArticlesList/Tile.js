import{ NavLink } from 'react-router-dom'

const Tile = ({article, idx}) =>{
    let avg = article.ratings.sum/article.ratings.len || 0

    return <div key={idx} className={`list-card-container`}>
                        {avg>75? <div className={`list-sidebar-green`}></div>:null}
                        {avg>0 && avg<50? <div className={`list-sidebar-red`} ></div>:null}
                        {avg===0? <div className={`list-sidebar`} ></div>:null}
                        {avg>=50 && avg<=75? <div className={`list-sidebar-yellow`} ></div>:null}
                    <div className="list-title">
                        <NavLink to={`/articles/${article.id}`}>
                            <div className="titlebtn">{article.title}</div>
                        </NavLink>
                    </div>
                    <div className="list-description">
                        Posted by: {article.username}<br/>{Math.round(avg)}% accuracy rating<br/> {article.comments} comments
                        <div className="navbtn">
                            <a target="_blank" without rel="noreferrer" href={article.description}>Source</a>
                        </div>
                    </div>
                    <div className="list-article">
                        {article.article.slice(0,50) }{"..."}


                    </div>
                    <div className="v-score">
                        <div className="list-badges">

                            {avg>75? <img alt="chckmark" className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/921974219733082173/Verified.png"/>:null}
                            {avg>0 && avg<50? <img alt="xmrk" className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/922093439854731274/UnVerifiedlogo.png"/>:null}
                        </div>
                        <br/>
                        {avg===0? <span className='weak-grey'>This has Not Been voted on yet</span>:null}
                        {avg>75? <span className='weak-grey'>This has been deemed an article of truth</span>:null}
                        {avg>0 && avg<50? <span className='weak-grey'>This has been deemed an article of untruth</span>:null}
                        {avg>=50 && avg<=75? <span className='weak-grey'>This is still up for debate</span>:null}

                    </div>
                </div>
}
 export default Tile
