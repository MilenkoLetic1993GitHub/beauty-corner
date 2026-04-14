<?php

namespace App\Http\Controllers;

use App\Models\PriceCategory;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $services = Service::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        $priceCategories = PriceCategory::query()
            ->where('is_active', true)
            ->with([
                'items' => fn ($query) => $query
                    ->where('is_active', true)
                    ->orderBy('sort_order'),
            ])
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Home', [
            'services' => $services,
            'priceCategories' => $priceCategories,
        ])->cache(3600);
    }
}
