import axios from 'axios';

const baseurl = '/admin/api/invoices';

const getVariables =
  'include_relations=Maintenances,Maintenances.Vehicles,Maintenances.Vehicles.Users';

export const getInvoices: API.GetDataFunction<
  Entities.Invoice[],
  true
> = async (page?: number, sort?: DataTable.SortParameter[]) => {
  const sortingString = '';
  if (sort) {
    sort.map(
      ({ property, direction }) => `&sort=${property}&direction=${direction}`
    );
  }
  const response: {
    data: API.DefaultResponse<Entities.Invoice[], true>;
  } = await axios.get(
    `${baseurl}?${getVariables}${sortingString}${page && `&page=${page}`}`
  );
  return response.data;
};

export const getInvoice: API.GetByIdFunction<Entities.Invoice> = async id => {
  const response: {
    data: API.DefaultResponse<Entities.Invoice>;
  } = await axios.get(`${baseurl}/${id}?${getVariables}`);
  return response.data;
};

export const getInvoiceDocument = async (id: number): Promise<string> => {
  const response = await axios({
    url: `${baseurl}/download/${id}`,
    method: 'GET',
    responseType: 'blob'
  });

  return response.data;
};

export const removeInvoice: API.RemoveDataFunction = async (id: number) => {
  const response: {
    data: API.DefaultResponse;
  } = await axios.delete(`${baseurl}/${id}`);

  return response.data.data;
};

export const updateInvoice: API.UpdateDataFunction<
  Partial<Entities.Invoice>,
  boolean
> = async (id, data) => {
  const response: {
    data: API.DefaultResponse<boolean>;
  } = await axios.put(`${baseurl}/${id}`, data);

  if (response.data.status === 'success') {
    return response.data;
  }

  throw new Error(response.data.message);
};
