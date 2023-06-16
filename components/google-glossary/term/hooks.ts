import { GoogleTerm, MyGoogleTerm } from '@/types/models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createTerm, deleteTerm, getTerms, updateTerm } from './fetchers';

function useTerms(glossaryId: string) {
  const { data: terms, isLoading } = useQuery<MyGoogleTerm[]>({
    queryKey: ['google', 'glossaries', glossaryId],
    queryFn: () => {
      return getTerms(glossaryId);
    },
  });

  const queryClient = useQueryClient();
  const { mutate: creationMutate, isLoading: isCreating } = useMutation<
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
  const { mutate: updationMutate, isLoading: isUpdating } = useMutation<
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
  const { mutate: deletionMutate, isLoading: isDeleting } = useMutation<
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
  term: GoogleTerm;
}
interface UpdateMutationFnParam {
  termId: MyGoogleTerm['id'];
  term: GoogleTerm;
}
interface DeleteMutationFnParam {
  termId: MyGoogleTerm['id'];
}

export { useTerms };
