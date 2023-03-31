import { MyGoogleTerm, Term } from '@/types/models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createTerm, deleteTerm, getTerms, updateTerm } from './fetchers';

export function useTerms(glossaryId: string) {
  const { data: terms, isLoading } = useQuery<MyGoogleTerm[]>({
    queryKey: ['google', 'glossaries', glossaryId],
    queryFn: () => {
      if (typeof glossaryId !== 'string') return [];
      return getTerms(glossaryId);
    },
  });

  const queryClient = useQueryClient();
  const { mutate: creationMutate, isLoading: isCreationLoading } = useMutation<
    void,
    AxiosError,
    CreateMutationFnParam
  >({
    mutationFn: ({ term }) => {
      return createTerm(glossaryId, term);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['google', 'glossaries', glossaryId],
      });
    },
  });
  const { mutate: updationMutate, isLoading: isUpdationLoading } = useMutation<
    void,
    AxiosError,
    UpdateMutationFnParam
  >({
    mutationFn: ({ termId, term }) => {
      return updateTerm(glossaryId, termId, term);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['google', 'glossaries', glossaryId],
      });
    },
  });
  const { mutate: deletionMutate, isLoading: isDeletionLoading } = useMutation<
    void,
    AxiosError,
    DeleteMutationFnParam
  >({
    mutationFn: ({ termId }) => {
      return deleteTerm(glossaryId, termId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['google', 'glossaries', glossaryId],
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

  interface CreateMutationFnParam {
    term: Term;
  }
  interface UpdateMutationFnParam {
    termId: MyGoogleTerm['id'];
    term: Term;
  }
  interface DeleteMutationFnParam {
    termId: MyGoogleTerm['id'];
  }
}
