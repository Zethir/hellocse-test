<?php

namespace App\Http\Controllers;

use App\Models\Star;
use App\Http\Requests\StarPostRequest;
use Illuminate\Http\Request;

class StarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $stars = Star::all();

        return response()->json($stars, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Requests\StarPostRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StarPostRequest $request)
    {
        $star = Star::create($request->validated());

        return response()->json([
            'success' => true,
            'data' => $star->toArray()
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Star  $star
     * @return \Illuminate\Http\Response
     */
    public function show(Star $star)
    {
        $star = Star::find($star);

        return response()->json($star, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Requests\StarPostRequest $request
     * @param  \App\Models\Star  $star
     * @return \Illuminate\Http\Response
     */
    public function update(StarPostRequest $request, Star $star)
    {
        $updated_star = $request->validated();
        $star->update($updated_star);

        return response()->json([
            'success' => true,
            'data' => $star->toArray()
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Star  $star
     * @return \Illuminate\Http\Response
     */
    public function destroy(Star $star)
    {
        $star->delete();

        return response()->json([
            'success' => true,
            'msg' => 'Star sucessfully deleted.'
        ], 200);
    }
}
