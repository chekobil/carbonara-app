let dataLength: number = 0;
export function useFetchStores() {
  const fetchStores = async (page: number) => {
    console.info("fetchStores, page", page);
    const itemsPerPage = 30;
    const sliceStart = (page - 1) * itemsPerPage;
    const sliceEnd = page * itemsPerPage;
    let data: {
      default: any[];
    } | null = await import("~/_models/store/stores.json");
    dataLength = data.default.length;
    const dataPaginated = data.default.slice(sliceStart, sliceEnd);
    data = null;
    return dataPaginated;
  };
  return {
    fetchStores,
  };
}
