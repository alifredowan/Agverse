<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AiController extends Controller
{
    public function status(): JsonResponse
    {
        $configured = filled(config('services.anthropic.key'));

        return response()->json([
            'installed' => true,
            'sdk' => 'laravel-http',
            'configured' => $configured,
            'message' => $configured
                ? 'Claude API is configured and ready.'
                : 'Claude API integration is ready. Add ANTHROPIC_API_KEY in backend/.env to enable completions.',
        ]);
    }

    public function ask(Request $request): JsonResponse
    {
        $prompt = trim((string) $request->input('prompt', ''));
        if ($prompt === '') {
            return response()->json([
                'success' => false,
                'message' => 'Field "prompt" is required.',
            ], 400);
        }

        $apiKey = config('services.anthropic.key');
        if (! $apiKey) {
            return response()->json([
                'success' => false,
                'message' => 'ANTHROPIC_API_KEY is not configured yet. Please add your key to backend/.env.',
            ], 503);
        }

        $system = $request->input('system')
            ?: 'You are AGverse Intelligence, an autonomous agricultural expert in Dubai specializing in precision farming, robotics, drones, and zero-waste crop production.';
        $model = $request->input('model') ?: 'claude-3-5-sonnet-latest';

        $response = Http::withHeaders([
            'x-api-key' => $apiKey,
            'anthropic-version' => '2023-06-01',
        ])->post('https://api.anthropic.com/v1/messages', [
            'model' => $model,
            'max_tokens' => 1024,
            'system' => $system,
            'messages' => [
                ['role' => 'user', 'content' => $prompt],
            ],
        ]);

        if ($response->failed()) {
            return response()->json([
                'success' => false,
                'message' => $response->json('error.message') ?? 'Error communicating with Claude API.',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'answer' => $response->json('content.0.text'),
        ]);
    }
}
