import authHeader from './helpers.js/authHeader';
import errorParser from './helpers.js/errorParser';

const API_URL = 'https://skylight-photography.herokuapp.com/shop/';

const startOrder = async (customerEmail, customerName, itemIds) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify({
      customerEmail,
      customerName,
      itemIds,
    }),
  };
  const res = await fetch(`${API_URL}startOrder`, requestOptions);

  const data = await res.json();

  errorParser(res, data);

  return { clientSecret: data.clientSecret, orderId: data.orderId };
};

const fetchOrders = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      ...authHeader(),
    },
  };

  const res = await fetch(`${API_URL}myOrders`, requestOptions);

  const data = await res.json();

  errorParser(res, data);

  return data;
};

const fetchOrder = async (orderId) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      ...authHeader(),
    },
  };

  const res = await fetch(`${API_URL}myOrder/${orderId}`, requestOptions);

  const data = await res.json();

  errorParser(res, data);

  return data.order;
};

const fetchSecureImage = async (endpoint) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      ...authHeader(),
    },
  };

  const res = await fetch(`${API_URL}${endpoint}`, requestOptions);

  errorParser(res, { message: 'Could not download image' });

  const blob = await res.blob();

  return URL.createObjectURL(blob);
};

const ordersApi = {
  startOrder,
  fetchOrders,
  fetchOrder,
  fetchSecureImage,
};

export default ordersApi;
