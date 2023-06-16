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
  const { mutate: creationMutate, isLoading: isCreationLoading } = useMutation<
    void,
    AxiosError<ErrorResponse>,
    CreateMutationFnParam
  >({
    mutationFn: ({ term }) => {
      return createTerm(term);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my', 'glossary'],
      });
    },
  });
  const { mutate: updationMutate, isLoading: isUpdationLoading } = useMutation<
    void,
    AxiosError<ErrorResponse>,
    UpdateMutationFnParam
  >({
    mutationFn: ({ term }) => {
      return updateTerm(term);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my', 'glossary'],
      });
    },
  });
  const { mutate: deletionMutate, isLoading: isDeletionLoading } = useMutation<
    void,
    AxiosError<ErrorResponse>,
    DeleteMutationFnParam
  >({
    mutationFn: (english) => {
      return deleteTerm(english);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my', 'glossary'],
      });
    },
  });

  return {
    terms,
    creationMutate,
    updationMutate,
    deletionMutate,
    isLoading,
    isProcessing: getIsProcessing(),
  };

  function getIsProcessing(): boolean {
    return isCreationLoading || isUpdationLoading || isDeletionLoading;
  }
}

interface CreateMutationFnParam {
  term: MyTerm;
}
interface UpdateMutationFnParam {
  term: MyTerm;
}
type DeleteMutationFnParam = MyTerm['english'];

export { useTerms };
