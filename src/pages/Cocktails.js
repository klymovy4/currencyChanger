import React,{useEffect, useState} from 'react';
import { CSSTransition }from 'react-transition-group'

export const Cocktails = () => {
    const [state, setState] = useState([])
    const [isLoading, setLoading] =useState(true)
    const [cocktailTransition, setCocktailTransition] = useState(false)
    const [chooseCocktail, setChooseCocktail] = useState({})


    useEffect(()=>{
        const drink = localStorage.getItem('drinks')
        fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
            .then(res=> res.json())
            .then((drinks)=>{
                setState(drinks)
                setChooseCocktail(JSON.parse(drink)  || drinks.drinks[0])
                setLoading(false)
                return drinks
            })
            .then(cocktail => {
                setCocktailTransition(true)
                return cocktail
            })
            
    }, [])
    useEffect(()=>{
        localStorage.setItem('drinks', JSON.stringify(chooseCocktail))
    },[chooseCocktail])

    const handlerValue =(event) =>{
        setCocktailTransition(false)
        const value = event.target.value
            state.drinks.filter(el => {
                setTimeout(()=>{
                    if(Object.values(el).includes(value)){
                        setCocktailTransition(true)
                        setChooseCocktail(el)
                    }
                }, 500)
            })
    }

    return (
        <div className='about-block'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className='form-block'>
                            {isLoading ? <p>Loading</p>:
                                <form>
                                    <label>
                                        <h2>Cocktails</h2>
                                        <select
                                            value={chooseCocktail.strDrink}
                                            name="cocktails"
                                            id="cocktails"
                                            onChange={event => handlerValue(event)}
                                        >
                                            {state.drinks.map(item=>{
                                                return (
                                                    <option value={item.strDrink} key={item.idDrink} >{item.strDrink}</option>
                                                )
                                            })}
                                        </select>
                                    </label>
                                </form>
                            }
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="output-block">
                            {chooseCocktail?<h2>Cocktail is <br/> {chooseCocktail.strDrink}</h2>: <p>Wait please</p> }
                            <CSSTransition
                                in={cocktailTransition}
                                timeout={1000}
                                classNames='os'
                                mountOnEnter
                                unmountOnExit
                            >
                                {/*<p>Hello</p>*/}
                                { chooseCocktail
                                    ? (
                                        <img
                                            className="img-thumbnail"
                                            src={chooseCocktail.strDrinkThumb}
                                            alt={chooseCocktail.strDrinkThumb}
                                        />
                                    ):
                                    <p>Loading // /</p>
                                }
                            </CSSTransition>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


