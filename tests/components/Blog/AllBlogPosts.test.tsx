import { render, screen, fireEvent } from "@testing-library/react";
import { AllBlogPosts } from "@/components";
import { useBlogPosts } from "@/hooks";
import { Post } from "@/interfaces";
import { mock } from "node:test";

// Mock the hooks
jest.mock("../../../src/hooks/useBlogPosts");

const mockPost: Post = {
  _id: "test-id-1",
  title: "Test Post 1",
  slug: "test-slug-1",
  publishedAt: "2023-06-10T10:00:00Z",
  mainImage: {
    asset: {
      _id: "test-image-id",
      url: "https://test-image-url.com",
    },
    alt: "Test Image Alt",
  },
  body: [],
  author: {
    name: "Test Author",
    avatar: "https://test-avatar-url.com",
    bio: "Test Bio",
    slug: "test-author-slug",
  },
  categories: [{ title: "Test Category", _id: "test-category-id" }],
};

const mockPosts = [
  mockPost,
  { ...mockPost, title: "Test Post 2", _id: "test-id-2", slug: "test-slug-2" },
  { ...mockPost, title: "Test Post 3", _id: "test-id-3", slug: "test-slug-3" },
  { ...mockPost, title: "Test Post 4", _id: "test-id-4", slug: "test-slug-4" },
];

const handleLatestPostsMock = jest.fn();

describe("AllBlogPosts", () => {
  beforeEach(() => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      items: mockPosts,
      query: "",
      hasMore: true,
      onInputChange: jest.fn(),
      fetchMoreData: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <AllBlogPosts
        posts={mockPosts}
        handleLatestPosts={handleLatestPostsMock}
      />
    );
    expect(
      screen.getByText("Explora el Mundo del Quiromasaje y la Terapia Manual")
    ).toBeInTheDocument();
  });

  it("calls handleLatestPosts when the button is clicked", () => {
    render(
      <AllBlogPosts
        posts={mockPosts}
        handleLatestPosts={handleLatestPostsMock}
      />
    );
    const button = screen.getByLabelText(
      "Ir a las últimas reflexiones y consejos"
    );
    fireEvent.click(button);
    expect(handleLatestPostsMock).toHaveBeenCalledTimes(1);
  });

  it("calls onInputChange when the search input value changes", () => {
    const onInputChangeMock = jest.fn();
    (useBlogPosts as jest.Mock).mockReturnValueOnce({
      ...useBlogPosts(mockPosts),
      onInputChange: onInputChangeMock,
    });

    render(
      <AllBlogPosts
        posts={mockPosts}
        handleLatestPosts={handleLatestPostsMock}
      />
    );
    const input = screen.getByPlaceholderText(
      "Buscar temas, categorías, consejos, técnicas..."
    );
    fireEvent.change(input, { target: { value: "test" } });
    expect(onInputChangeMock).toHaveBeenCalledTimes(1);
  });

  it("renders the correct number of posts", () => {
    render(
      <AllBlogPosts
        posts={mockPosts}
        handleLatestPosts={handleLatestPostsMock}
      />
    );
    const postTitles = screen.getAllByRole("heading", { level: 3 });
    expect(postTitles.length).toBe(mockPosts.length);
  });

  it("renders the PostsLoading component when fetching more posts", () => {
    (useBlogPosts as jest.Mock).mockReturnValueOnce({
      ...useBlogPosts(mockPosts),
      hasMore: true,
    });

    const { container } = render(
      <AllBlogPosts
        posts={mockPosts}
        handleLatestPosts={handleLatestPostsMock}
      />
    );

    // Use container.querySelector to select the element by its class
    const infiniteScroll = container.querySelector(
      ".infinite-scroll-component"
    );
    fireEvent.scroll(infiniteScroll!, { target: { scrollY: 1000 } }); // Use ! to assert that the element is not null

    const loadingComponent = screen.getByText(/Scroll para ver más posts.../i);
    expect(loadingComponent).toBeInTheDocument();
  });

  it("does not try to fetch more posts when there are no more posts to load", () => {
    const fetchMoreDataMock = jest.fn();
    (useBlogPosts as jest.Mock).mockReturnValueOnce({
      ...useBlogPosts(mockPosts),
      hasMore: false,
      fetchMoreData: fetchMoreDataMock,
    });

    const { container } = render(
      <AllBlogPosts
        posts={mockPosts}
        handleLatestPosts={handleLatestPostsMock}
      />
    );

    // Use container.querySelector to select the element by its class
    const infiniteScroll = container.querySelector(
      ".infinite-scroll-component"
    );
    fireEvent.scroll(infiniteScroll!, { target: { scrollY: 1000 } });

    expect(fetchMoreDataMock).not.toHaveBeenCalled();
  });

  it("links each post to the correct URL based on its slug", () => {
    render(
      <AllBlogPosts
        posts={mockPosts}
        handleLatestPosts={handleLatestPostsMock}
      />
    );
    mockPosts.forEach((post) => {
      const postLink = screen.getByRole("link", { name: post.title });
      expect(postLink.getAttribute("href")).toBe(`/blog/${post.slug}`);
    });
  });

  it("reflects the current query state in the search input", () => {
    const mockQuery = "test query";
    (useBlogPosts as jest.Mock).mockReturnValueOnce({
      ...useBlogPosts(mockPosts),
      query: mockQuery,
    });

    render(
      <AllBlogPosts
        posts={mockPosts}
        handleLatestPosts={handleLatestPostsMock}
      />
    );
    const input = screen.getByPlaceholderText(
      "Buscar temas, categorías, consejos, técnicas..."
    ) as HTMLInputElement;
    expect(input.value).toBe(mockQuery);
  });
});
