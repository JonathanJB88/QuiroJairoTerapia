import { render, screen, fireEvent } from "@testing-library/react";
import { CommentList } from "@/components";

import { useAuthStore } from "../../../src/hooks/useAuthStore";
import { useCommentsData } from "../../../src/hooks/useCommentsData";
import { useCommentStore } from "../../../src/hooks/useCommentStore";
import { toastNotification } from "../../../src/helpers/toastNotification";

// Mock the hooks
jest.mock("../../../src/hooks/useAuthStore");
jest.mock("../../../src/hooks/useCommentsData");
jest.mock("../../../src/hooks/useCommentStore");
jest.mock("../../../src/helpers/toastNotification", () => ({
  ...jest.requireActual("../../../src/helpers/toastNotification"),
  toastNotification: jest.fn(),
}));

describe("Blog/CommentList", () => {
  const mockPostId = "test-post-id";
  const mockUser = { uid: "test-uid", name: "Test User" };
  const mockComments = [
    {
      commentId: "comment-id-1",
      user: mockUser,
      content: "Test Comment 1",
      likes: [],
      createdAt: new Date().toISOString(),
      approved: true,
    },
    {
      commentId: "comment-id-2",
      user: mockUser,
      content: "Test Comment 2",
      likes: [],
      createdAt: new Date().toISOString(),
      approved: false,
    },
  ];

  beforeEach(() => {
    // Setup mock return values
    (useAuthStore as jest.Mock).mockReturnValue({ user: mockUser });
    (useCommentsData as jest.Mock).mockReturnValue({
      recentComments: mockComments,
    });
    (useCommentStore as jest.Mock).mockReturnValue({
      comments: mockComments,
      errorMessage: null,
      getComments: jest.fn(),
      likeComment: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the list of comments", () => {
    render(<CommentList postId={mockPostId} />);

    mockComments.forEach((comment) => {
      const commentElement = screen.getByText(comment.content);
      expect(commentElement).toBeInTheDocument();
    });
  });

  it("displays an appropriate message when there are no comments", () => {
    (useCommentsData as jest.Mock).mockReturnValueOnce({ recentComments: [] });
    render(<CommentList postId={mockPostId} />);

    const noCommentsMessage = screen.getByText("Todavía no hay comentarios!");
    expect(noCommentsMessage).toBeInTheDocument();
  });

  it("handles the like button click correctly", () => {
    const likeCommentMock = jest
      .fn()
      .mockResolvedValue({ ok: true, msg: "Liked!" });
    (useCommentStore as jest.Mock).mockReturnValueOnce({
      ...useCommentStore(),
      likeComment: likeCommentMock,
    });

    render(<CommentList postId={mockPostId} />);

    const likeButtons = screen.getAllByRole("button", { name: /Me gusta/ });
    fireEvent.click(likeButtons[0]);

    expect(likeCommentMock).toHaveBeenCalledTimes(1);
  });

  it("displays error messages from the errorMessage state", () => {
    const mockErrorMessage = "Test Error Message";
    (useCommentStore as jest.Mock).mockReturnValueOnce({
      ...useCommentStore(),
      errorMessage: mockErrorMessage,
    });

    render(<CommentList postId={mockPostId} />);

    expect(toastNotification).toHaveBeenCalledWith("error", mockErrorMessage);
  });
});
