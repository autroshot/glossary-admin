import { MyTerm } from '@/types/models';
import { ErrorResponse } from '@/types/responses';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createTerm, deleteTerm, getTerms, updateTerm } from './fetchers';

function useTerms() {
  const { data: terms, isLoading } = useQuery<MyTerm[]>({
    queryKey: ['my', 'glossary'],
    queryFn: () => {
      return getTerms();
    },
  });

  const queryClient = useQueryClient();
  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['my', 'glossary'] });
  };
  const { mutate: creationMutate, isLoading: isCreating } = useMutation<
    void,
    AxiosError<ErrorResponse>,
    CreateMutationFnParam
  >({
    mutationFn: ({ term }) => {
      return createTerm(term);
    },
    onSuccess: invalidateQueries,
  });
  const { mutate: updationMutate, isLoading: isUpdating } = useMutation<
    void,
    AxiosError<ErrorResponse>,
    UpdateMutationFnParam
  >({
    mutationFn: ({ term }) => {
      return updateTerm(term);
    },
    onSuccess: invalidateQueries,
  });
  const { mutate: deletionMutate, isLoading: isDeleting } = useMutation<
    void,
    AxiosError<ErrorResponse>,
    DeleteMutationFnParam
  >({
    mutationFn: (english) => {
      return deleteTerm(english);
    },
    onSuccess: invalidateQueries,
  });

  const isProcessing = isCreating || isUpdating || isDeleting;

  return {
    terms,
    creationMutate,
    updationMutate,
    deletionMutate,
    isLoading,
    isProcessing: isProcessing,
  };
}

interface CreateMutationFnParam {
  term: MyTerm;
}
interface UpdateMutationFnParam {
  term: MyTerm;
}
type DeleteMutationFnParam = MyTerm['english'];

export { useTerms };
