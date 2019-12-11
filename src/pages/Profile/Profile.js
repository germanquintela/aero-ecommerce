import React, {  } from 'react';
import Points from '../../components/Points'
import useFetch from '../../hooks/useFetch'
import {urlApi} from '../../utils/constants'
import HistoryList from '../../components/HistoryList'
import './Profile.scss'
import Spinner from 'react-spinner-material';


export default function Home(props) {

  const {userData: {loading, result}, modifyPoints} = props

  const history = useFetch(`${urlApi}/user/history`, 'GET');

  const addPoints = (amount) => {
        (async () => {
            try {
                 await fetch('https://coding-challenge-api.aerolab.co/user/points',  {
                    crossDomain:true,
                    method: 'POST',
                      headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU2ZjI2NjYzOTZhMjAwNmRhMzI0NjciLCJpYXQiOjE1NzU0MTY0MjJ9.Ih-gIHeea1BKWCqlCA4aJf88AynBYkny6rEiK291IxQ`
                      },
                      body: JSON.stringify({
                        amount: amount
                      })

                  });
                  modifyPoints(result.points + amount)
                console.log(result.points + amount)
            } catch (error) {
            }
        })();
  }

  return (
      <div className="me-page">

          <div className="profile">
            <div className="profile__picture"> </div>
            {!loading ?
                <>
                <p className="profile__name">{result.name}</p>
                <Points points={result.points}/>
                <div className="profile__buttons">
                    <button onClick={() => addPoints(1000)}>Add 1000 Points</button> <button onClick={() => addPoints(5000)}>Add 5000 Points</button> <button onClick={() => addPoints(7500)}>Add 7500 Points</button>
                </div>
                </> :
                <Spinner size={30} spinnerColor={"#0644a3"} spinnerWidth={2} visible={true} className='spinner-home'/>

            }
          </div>

          <div className="history">
            <h3 className="history__title">Redeem history</h3>
            {!history.loading ?
            <HistoryList history={history}/> :
            <Spinner size={30} spinnerColor={"#0644a3"} spinnerWidth={2} visible={true} className='spinner-home'/>

            }
          </div>
      </div>
  )
}
