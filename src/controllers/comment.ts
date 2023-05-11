import type { NextApiRequest, NextApiResponse } from 'next';

import Comment, { IComment } from '@/models/Comment';
import { errorResponse, formatComment } from '@/helpers';

import { CreateCommentBody, DeleteCommentQuery, GetCommentsQuery, UpdateCommentBody } from '@/interfaces';

// Create a comment
const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId, userId, content, rating, type } = req.body as CreateCommentBody;

  try {
    let existingComment: IComment | null = null;

    if (type === 'comment') {
      existingComment = await Comment.findOne({ postId, userId });
    } else if (type === 'review') {
      existingComment = await Comment.findOne({ userId, type });
    }

    if (existingComment) {
      return errorResponse(res, 400, 'Gracias, pero ya has dejado un comentario.');
    }

    const commentData = {
      postId: type === 'comment' ? postId : undefined,
      userId,
      content,
      rating,
      type,
    };

    const comment: IComment = new Comment(commentData);
    await comment.save();

    res.status(201).json(formatComment(comment));
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, 'Por favor, contacte al administrador');
  }
};

// Get comments by postId or type (testimonials)
const getCommentsByTypeOrPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId, type } = req.query as GetCommentsQuery;

  let query = {};

  if (postId) {
    query = { postId };
  } else if (type === 'review') {
    query = { type: 'review' };
  } else {
    return errorResponse(res, 400, 'Parámetros inválidos');
  }

  try {
    const comments: IComment[] = await Comment.find(query).sort({ createdAt: -1 }).lean();
    if (!comments.length) {
      return errorResponse(res, 404, 'No se encontraron comentarios');
    }

    res.status(200).json(comments.map((comment) => formatComment(comment)));
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, 'Por favor, contacte al administrador');
  }
};

// Update a comment
const updateComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { commentId, content, rating, approved } = req.body as UpdateCommentBody;

  try {
    const comment: IComment | null = await Comment.findByIdAndUpdate(
      commentId,
      { content, rating, approved },
      { new: true }
    );

    if (!comment) {
      return errorResponse(res, 404, 'No se encontró el comentario');
    }

    res.status(200).json(formatComment(comment));
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, 'Por favor, contacte al administrador');
  }
};

// Delete a comment
const deleteComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { commentId } = req.query as DeleteCommentQuery;

  try {
    const comment: IComment | null = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return errorResponse(res, 404, 'No se encontró el comentario');
    }

    res.status(200).json({
      ok: true,
      msg: 'Comentario eliminado correctamente',
    });
  } catch (error) {
    console.log('Error al eliminar el comentario: ', error);
    errorResponse(res, 500, 'Por favor, contacte al administrador');
  }
};

export { createComment, getCommentsByTypeOrPost, updateComment, deleteComment };
