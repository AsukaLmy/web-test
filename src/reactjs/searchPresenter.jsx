import { model } from '../DinnerModel.js';
import { SearchFormView } from '../views/searchFormView.jsx';
import { SearchResultsView } from '../views/searchResultsView.jsx';

function SearchPresenter() {
    const [, setModelState] = useState({});

    useEffect(() => {
        function observer() {
        setModelState({});
        }
        model.addObserver(observer);
        return () => model.removeObserver(observer);
    }, []);

    const dishTypeOptions = ["starter", "main course", "dessert"];

    // 从模型中获取搜索参数和结果
    const { searchParams, searchResultsPromiseState } = model;
    const text = searchParams.query || '';
    const type = searchParams.type || '';

    // 事件处理函数
    function handleTextChange(newText) {
        model.setSearchQuery(newText);
    }

    function handleTypeChange(newType) {
        model.setSearchType(newType);
    }

    function handleDishSearch() {
        model.doSearch(model.searchParams);
    }

    function handleDishClick(dish) {
        model.setCurrentDishId(dish.id);
    }

    // 条件渲染搜索结果
    let searchResultsContent = null;

    if (searchResultsPromiseState.promise) {
        if (!searchResultsPromiseState.data && !searchResultsPromiseState.error) {
        searchResultsContent = <div>加载中...</div>;
        } else if (searchResultsPromiseState.data) {
        searchResultsContent = (
            <SearchResultsView
            searchResults={searchResultsPromiseState.data.results}
            onDishClick={handleDishClick}
            />
        );
        } else if (searchResultsPromiseState.error) {
        searchResultsContent = <div>错误：{searchResultsPromiseState.error.message}</div>;
        }
    }

    return (
        <div>
        <SearchFormView
            dishTypeOptions={dishTypeOptions}
            text={text}
            type={type}
            onTextChange={handleTextChange}
            onTypeChange={handleTypeChange}
            ondishSearch={handleDishSearch}
        />
        {searchResultsContent}
        </div>
    );
}

export {SearchPresenter};
