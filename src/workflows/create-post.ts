import { StepResponse, WorkflowResponse, createStep, createWorkflow } from '@medusajs/framework/workflows-sdk';
import { BLOG_MODULE } from 'src/modules/blog';
import BlogModuleService from 'src/modules/blog/service';

type CreatePostWorkflowInput = {
  title: string;
};

const createPostStep = createStep(
  // step name
  'create-post',
  // step handler
  async ({ title }: CreatePostWorkflowInput, { container }) => {
    const blogModuleService: BlogModuleService = container.resolve(BLOG_MODULE);

    const post = await blogModuleService.createPosts({
      title,
    });

    return new StepResponse(post, post);
  },
  // rollback when the step fails
  async (post, { container }) => {
    const blogModuleService: BlogModuleService = container.resolve(BLOG_MODULE);

    return blogModuleService.deletePosts(post.id);
  }
);

export const createPostWorkflow = createWorkflow('create-post', (postInput: CreatePostWorkflowInput) => {
  const post = createPostStep(postInput);
  return new WorkflowResponse(post);
});
