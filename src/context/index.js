import React, {createContext, useReducer} from 'react';

const BlogContext = createContext();

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'setData':
      return action.payload;
    case 'setLoading':
      return action.payload;
    case 'setPage':
      return action.payload;
    case 'setRefreshing':
      return action.payload;
    default:
      return state;
  }
};

export const BlogProvider = ({children}) => {
  const [data, setData] = useReducer(blogReducer, []);
  const [page, setPage] = useReducer(blogReducer, 1);
  const [isLoading, setLoading] = useReducer(blogReducer, true);
  const [refreshing, setRefreshing] = useReducer(blogReducer, false);

  const getBlogPosts = () => {
    console.log('getBlogPosts çalıştı');
    fetch(
      `https://www.lenasoftware.com/api/v1/en/maestro/1?page=${page}&count=10`,
    )
      .then((response) => response.json())
      .then((json) => {
        var last_elementJson = json.result.length - 1;

        var last_elementData =
          data.length === 0 ? data.length : data.length - 1;
        console.log('last_elementJson: ' + last_elementJson);
        console.log('last_elementData: ' + last_elementData);

        if (
          JSON.stringify(json.result[last_elementJson]) ===
          JSON.stringify(data[last_elementData])
        ) {
          setRefreshing({type: 'setRefreshing', payload: false});
          console.log('Datalar aynı ekleme YAPILMADI!');
        } else {
          if (last_elementJson < 0) {
            console.log('yeni veri yok');
            setRefreshing({type: 'setRefreshing', payload: false});
          } else {
            console.log('Datalar aynı değil,yeni veri var, ekleme YAPILDI!');
            setData({type: 'setData', payload: [...data, ...json.result]});
            setRefreshing({type: 'setRefreshing', payload: false});
          }
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading({type: 'setLoading', payload: false}));
  };

  const handleRefresh = () => {
    setRefreshing({type: 'setRefreshing', payload: true});
    getBlogPosts();
  };

  const handleLoadMore = () => {
    setPage({type: 'setPage', payload: page + 1});
  };

  return (
    <BlogContext.Provider
      value={{
        data,
        setData,
        page,
        setPage,
        isLoading,
        refreshing,
        setRefreshing,
        getBlogPosts,
        handleRefresh,
        handleLoadMore,
      }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
